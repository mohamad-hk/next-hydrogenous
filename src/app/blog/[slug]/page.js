import BlogContent from "@/app/components/Blog/BlogContent";
import BreadCrump from "@/app/components/Blog/BreadCrump";
import Image from "next/image";

export const revalidate = 15; 

const BlogPost = async ({ params }) => {
  const { slug } = await params; 

  if (!slug) {
    return <p>پست پیدا نشد</p>;
  }

  const response = await fetch(
    `http://localhost:3000/api/Blogs/Post?post_id=${encodeURIComponent(slug.toString())}`,
    {
      next: { revalidate: 15 }, 
    }
  );

  if (!response.ok) {
    console.error("Failed to fetch post:", response.status);
    return <p>پست پیدا نشد</p>;
  }

  const post = await response.json();

  if (!post || post.length === 0) {
    return <p>پست پیدا نشد</p>;
  }

  return (
    <div className="p-5 flex flex-col gap-3 lg:max-w-[60%] mx-auto">
      <BreadCrump title={post[0].post_title}/>
      <h1 className="text-2xl font-bold">{post[0].post_title}</h1>
      <div className="flex flex-row justify-center items-center">
        <Image
          src={post[0].post_feature_image}
          width={1000}
          height={500}
          className="rounded-md"
          alt="image not found"
        />
      </div>
      <BlogContent content={post[0].post_content} />
    </div>
  );
};

export default BlogPost;
