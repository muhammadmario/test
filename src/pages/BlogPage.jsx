import React, { useState, useEffect } from "react";
import Navbar from "../organisms/Navbar";
import { db } from "../firebase";
import {
  addDoc,
  collection,
  updateDoc,
  deleteDoc,
  getDocs,
  doc,
} from "firebase/firestore";
import Form from "../molecules/Form";

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [editingBlog, setEditingBlog] = useState(null);

  const blogsCollectionRef = collection(db, "blogs");

  const fetchData = async () => {
    // const data = await db.collection("blogs").get();
    const data = await getDocs(blogsCollectionRef);
    setBlogs(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    console.log(blogs);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addPost = async () => {
    await addDoc(blogsCollectionRef, { title: title, desc: desc });
    setTitle("");
    setDesc("");
    fetchData();
  };

  const editPost = (blog) => {
    setEditingBlog(blog);
    setTitle(blog.title);
    setDesc(blog.desc);
  };

  const updatePost = async () => {
    const blogDoc = doc(db, "blogs", editingBlog.id);
    await updateDoc(blogDoc, { title, desc });
    setTitle("");
    setDesc("");
    setEditingBlog(null);
    fetchData();
  };

  const deletePost = async (id) => {
    const blogDoc = doc(db, "blogs", id);
    await deleteDoc(blogDoc);
    fetchData();
  };

  return (
    <>
      <Navbar />
      <section className="max-w-lg m-auto">
        <Form
          formTitle="Login"
          fields={[
            {
              name: "title",
              label: "Title",
              type: "text",
              placeholder: "Enter your title",
              value: title,
              onChange: (e) => setTitle(e.target.value),
            },
            {
              name: "desc",
              label: "Desc",
              type: "desc",
              placeholder: "Enter your desc",
              value: desc,
              onChange: (e) => setDesc(e.target.value),
            },
          ]}
          helperText={""}
          link={"#"}
          onSubmit={(e) => {
            // Handle form submission
            e.preventDefault();
            e.preventDefault();
            if (editingBlog) {
              updatePost();
            } else {
              addPost(title, desc);
            }

            // Your form submission logic here
          }}
        />
        <div className="m-auto w-full flex flex-col gap-3 justify-center items-center">
          {blogs &&
            blogs.map((blog) => (
              <li
                key={blog.id}
                className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {blog.title}
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  {blog.desc}
                </p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => editPost(blog)}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Edit
                    <svg
                      className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => deletePost(blog.id)}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Delete
                    <svg
                      className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </button>
                </div>
              </li>
            ))}
        </div>
      </section>
      {/* <div>
        <h2>Create Blog Post</h2>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>desc:</label>
        <textarea value={desc} onChange={(e) => setDesc(e.target.value)} />
        <button onClick={addPost}>Add Post</button>

        <h2>Blog blogs</h2>
        <ul>
          {blogs.map((post) => (
            <li key={post.id}>
              <strong>{post.title}</strong>
              <p>{post.desc}</p>
              <button onClick={() => deletePost(post.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div> */}
    </>
  );
}
