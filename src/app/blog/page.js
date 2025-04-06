"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Page = () => {
    const [post, setPost] = useState([]);
    const [skip, setSkip] = useState(0);

    const fetchData = async (currentSkip) => {
        try {
            const response = await fetch(`https://dummyjson.com/posts?limit=4&skip=${currentSkip}`);
            const data = await response.json();
            setPost((prev) => [...prev, ...data.posts]);
            setSkip(currentSkip + 4); // Increment by 4 to avoid skipping posts
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    
    useEffect(() => {
        fetchData(0); // Initial fetch with skip=0
    }, []);
    
    return (
        <div className="max-w-screen-xxl mx-auto p-16">
            <div className="sm:grid lg:grid-cols-4 sm:grid-cols-2 gap-10">
                {post.map((item) => (
                    <Link href={`/blog/${item.id}`} key={item.id}>
                        <div className="hover:bg-gray-900 hover:text-white transition duration-300 max-w-sm rounded overflow-hidden shadow-lg cursor-pointer">
                            <div className="py-4 px-8">
                                <div>{item.id}</div>
                                <h4 className="text-lg mb-3 font-semibold">{item.title}</h4>
                                <p className="mb-2 text-sm text-gray-600">
                                    {item.body.length > 30 ? item.body.slice(0, 30) + "..." : item.body}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            <div className="mt-8 text-center">
                <button
                    onClick={() => fetchData(skip)} // Pass the current skip value
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-800 transition"
                >
                    Load More
                </button>
            </div>
        </div>
    );
}

export default Page;
