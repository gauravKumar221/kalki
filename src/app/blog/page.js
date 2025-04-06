'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Page = () => {
    const [post, setPost] = useState([]);
    const [skip, setSkip] = useState(0);
    const [totalPosts, setTotalPosts] = useState(null); // total from API

    // Load from localStorage on first render
    useEffect(() => {
        const cachedPosts = localStorage.getItem('blogPosts');
        const cachedSkip = localStorage.getItem('blogSkip');
        const cachedTotal = localStorage.getItem('blogTotal');

        if (cachedPosts && cachedSkip && cachedTotal) {
            setPost(JSON.parse(cachedPosts));
            setSkip(Number(cachedSkip));
            setTotalPosts(Number(cachedTotal));
        } else {
            fetchData(0);
        }
    }, []);

    const fetchData = async (currentSkip) => {
        try {
            const response = await fetch(`https://dummyjson.com/posts?limit=4&skip=${currentSkip}`);
            const data = await response.json();

            const updatedPosts = [...post, ...data.posts];
            setPost(updatedPosts);
            setSkip(currentSkip + 4);
            setTotalPosts(data.total);

            // Cache to localStorage
            localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
            localStorage.setItem('blogSkip', currentSkip + 4);
            localStorage.setItem('blogTotal', data.total);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleLoadLess = () => {
        const newPosts = post.slice(0, post.length - 4);
        setPost(newPosts);
        setSkip(skip - 4);

        localStorage.setItem('blogPosts', JSON.stringify(newPosts));
        localStorage.setItem('blogSkip', skip - 4);
    };

    return (
        <div className="container my-10">
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

            {/* Buttons */}
            <div className="my-8 text-center flex gap-4 justify-center items-center">
                {post.length < totalPosts && (
                    <button
                        onClick={() => fetchData(skip)}
                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-800 transition"
                    >
                        Load More
                    </button>
                )}

                {post.length > 4 && (
                    <button
                        onClick={handleLoadLess}
                        className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-700 transition"
                    >
                        Load Less
                    </button>
                )}
            </div>
        </div>
    );
};

export default Page;
