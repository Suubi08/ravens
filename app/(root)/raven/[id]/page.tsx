
import RavenCard from "@/components/cards/RavenCard";
import Comment from "@/components/forms/Comment";
import { fetchRavenById } from "@/lib/actions/ravens.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: { id: string }}) => {
    if(!params.id) return null

    const user = await currentUser();
    if(!user) return null;

    const userInfo = await fetchUser(user.id);
    if(!userInfo?.onboarded) redirect('/onboarding')

    const raven = await fetchRavenById(params.id);
    //console.log(raven);
    return(
        <section className="relative">
            <div>
                <RavenCard 
                    key={raven._id}
                    id={raven._id}
                    currentUserId={user?.id || ""}
                    parentId={raven.parentId}
                    content={raven.text}
                    author={raven.author}
                    community={raven.community}
                    createdAt={raven.createdAt}
                    comments={raven.children}
                />
            </div>

            <div className="mt-7">
                <Comment 
                    ravenId={raven.id}
                    currentUserImg={userInfo.image}
                    currentUserId={JSON.stringify(userInfo._id)}
                />
            </div>
            <div className="mt-10">
                {raven.children.map((childItem: any) => (
                    <RavenCard 
                        key={childItem._id}
                        id={childItem._id}
                        currentUserId={childItem?.id || ""}
                        parentId={childItem.parentId}
                        content={childItem.text}
                        author={childItem.author}
                        community={childItem.community}
                        createdAt={childItem.createdAt}
                        comments={childItem.children}
                        isComment
                    />
                ))}
            </div>
        </section>
    )
}

export default Page;