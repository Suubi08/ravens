import { fetchUserPosts } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import RavenCard from "../cards/RavenCard";

interface Props {
    currentUserId: string;
    accountId: string;
    accountType: string; 
}

const RavensTab = async ({ currentUserId, accountId, accountType }: Props) => {
    let result = await fetchUserPosts(accountId);

    if(!result) redirect('/')

    return (
        <section className="mt-9 flex flex-col gap-10">
            {result.ravens.map((raven: any) => (
                <RavenCard 
                    key={raven._id}
                    id={raven._id}
                    currentUserId={currentUserId}
                    parentId={raven.parentId}
                    content={raven.text}
                    author={
                        accountType === 'User' ? 
                        {name: result.name, image: result.image, id: result.id } 
                        : { name: raven.author.name, image: raven.author.image, id: raven.author.id }
                    }
                    community={raven.community} //todo
                    createdAt={raven.createdAt}
                    comments={raven.children}
                />
            ))}
        </section>
    )
}

export default RavensTab;