import Image from "next/image";
import Link from "next/link";
import convertToPersianMonthYear from "../utils/ConvertToMonth";
import BlogContent from "../components/Blog/BlogContent";

export const revalidate = 60;

const getPosts = async () => {
  const response = await fetch("https://hydrogenous.vercel.app/api/Blogs", {
    next: { revalidate: 60 },
  });

  return await response.json();
};

const Blog = async () => {
  const posts = await getPosts();

  return (
    <div className="grid grid-cols-1 px-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:px-40 py-10">
      {posts.map((post) => (
        <Link href={`/blog/${post.post_id}`} key={post.post_id}>
        <div className="flex flex-col gap-3 border p-2 rounded-lg relative">
            <Image
              src={`${post.post_feature_image}`}
              width={400}
              height={800}
              alt="image not found"
              className="rounded-md"
            />
            <h2 className="font-bold text-lg px-2">{post.post_title}</h2>
            <p className="line-clamp-2 px-2">
              <BlogContent content={post.post_content} />
            </p>
            <p className="text-white bg-gray-400 absolute max-w-[70px] rounded-bl-xl text-center text-xl">
              {convertToPersianMonthYear(post.post_created_at)}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Blog;
