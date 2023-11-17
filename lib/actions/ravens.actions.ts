"use server"

import { revalidatePath } from "next/cache";
import Raven from "../models/raven.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

interface Params {
    text: string,
    author: string,
    communityId: string | null,
    path: string,
}

export async function createRaven({ text, author, communityId, path}:Params) {
    try {
        connectToDB();

        const createdRaven = await Raven.create({
            text,
            author,
            community: null,
        });
    
        //Update user model
        await User.findByIdAndUpdate(author, {
            $push: {ravens: createdRaven._id}
        })
    
        revalidatePath(path);     
    } catch (error: any) {
        throw new Error(`Error creating raven: ${error.message}`)   
    }
}

export async function fetchPosts(pageNumber = 1, pageSize = 20) {
    connectToDB();

    //Calculate the number of posts to skip
    const skipAmount = (pageNumber - 1) * pageSize;

    // Fetch the posts that have no parents (top-level ravens)
    const postsQuery = Raven.find({ parentId: { $in: [null, undefined]}})
        .sort({ createdAt: 'desc' })
        .skip(skipAmount)
        .limit(pageSize)
        .populate({ path: 'author', model: User })
        .populate({
            path: 'children',
            populate: {
                path: 'author',
                model: User,
                select: "_id name parentId image"
            }
        })

        const totalPostsCount = await Raven.countDocuments({ parentId: { $in: 
        [null, undefined]} })

        const posts = await postsQuery.exec();

        const isNext = totalPostsCount > skipAmount + posts.length;

        return { posts, isNext };
            
}

export async function fetchRavenById(id: string) {
    connectToDB();

    try {
        
        //TODO: Populate Community
        const raven = await Raven.findById(id)
            .populate({
                path: 'author',
                model: User,
                select: "_id id name image"
            })
            .populate({
                path: 'children',
                populate: [
                    {
                        path: 'author',
                        model: User,
                        select: "_id id name parentId image"
                    },
                    {
                        path: 'children',
                        model: Raven,
                        populate: {
                            path: 'author',
                            model: User,
                            select: "_id id name parentId image"
                        }
                    }
                ]
            }).exec();

            return raven;
    } catch (error: any) {
        throw new Error(`Error fetching raven: ${error.message}`)
    }
}

export async function addCommentToRaven(
    ravenId: string,
    commentText: string,
    userId: string,
    path: string,
) {
    connectToDB();

    try {
        // Find the original raven by its ID
        const originalRaven = await Raven.findById(ravenId);

        if(!originalRaven) {
            throw new Error("Raven not found")
        }

        // Create a new raven with the comment text
        const commentRaven = new Raven({
            text: commentText,
            author: userId,
            parentId: ravenId,
        })

        // Save the new raven
        const savedCommentRaven = await commentRaven.save();

        // Update the original raven to include the new comment
        originalRaven.children.push(savedCommentRaven._id);

        // Save the original raven
        await originalRaven.save();

        revalidatePath(path);
        
    } catch (error: any) {
        throw new Error(`Error adding comment to thread: ${error.message}`)
    }
}