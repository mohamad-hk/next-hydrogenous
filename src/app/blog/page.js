import Image from "next/image";
import convertToPersianDate from "../utils/ConvertToPersianDate";
import Link from "next/link";

export const revalidate = 60;

// const getPosts = async () => {
//   const response = await fetch("http://localhost:3000/api/Blogs", {
//     next: { revalidate: 60 },
//   });

//   return await response.json();
// };

const Blog = async () => {
  // const posts = await getPosts();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 px-40 py-10">
      {/* {posts.map((post) => (
        <Link href={`/blog/${post.post_title}`} key={post.post_id}>
          <div className="border p-4 rounded-lg">
            <h2 className="font-bold text-lg">{post.post_title}</h2>
            <Image
              src={`/images/posts/${post.post_feature_image}`}
              width={300}
              height={300}
              alt="image not found"
            />
            <p>{post.post_content}</p>
            <p>{convertToPersianDate(post.post_created_at)}</p>
          </div>
        </Link>
      ))} */}
    </div>
  );
};

export default Blog;
