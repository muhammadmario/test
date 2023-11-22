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
import Card from "../molecules/Card";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [editingBlog, setEditingBlog] = useState(null);

  const blogsCollectionRef = collection(db, "blogs");

  const fetchData = async () => {
    const data = await getDocs(blogsCollectionRef);
    setBlogs(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addPost = async () => {
    await addDoc(blogsCollectionRef, { title: title, desc: desc });
    toast.success(`Successfull create`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
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
    toast.success(`Successfull edit`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setTitle("");
    setDesc("");
    setEditingBlog(null);
    fetchData();
  };

  const deletePost = async (id) => {
    const blogDoc = doc(db, "blogs", id);
    await deleteDoc(blogDoc);
    toast.success(`Successfull Delete`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    fetchData();
  };

  return (
    <>
      <Navbar />
      <section className="px-3">
        <div className="max-w-lg m-auto pb-4">
          <Form
            formTitle="Blogs"
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
            textButton={editingBlog ? "Edit" : "Create"}
            onSubmit={(e) => {
              e.preventDefault();
              if (editingBlog) {
                updatePost();
              } else {
                addPost(title, desc);
              }
            }}
          />
        </div>
        <div className="m-auto w-full flex flex-row flex-wrap gap-3 justify-center items-center">
          {blogs &&
            blogs.map((blog) => (
              <Card
                key={blog.id}
                blog={blog}
                editPost={editPost}
                deletePost={deletePost}
              />
            ))}
        </div>
      </section>
      <ToastContainer />
    </>
  );
}
