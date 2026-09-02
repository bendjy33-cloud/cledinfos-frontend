"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";


type Comment = {
  id: number;
  name: string;
  comment: string;
  created_at: string;
};


export default function Comments({
  slug,
}: {
  slug: string;
}) {

  const t = useTranslations("Comments");

  const API = process.env.NEXT_PUBLIC_API_URL;


  const [comments, setComments] = useState<Comment[]>([]);

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [comment, setComment] = useState("");

  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);



  async function loadComments(){

    const res = await fetch(
      `${API}/posts/${slug}/comments`,
      {
        cache:"no-store"
      }
    );


    const data = await res.json();


    setComments(data.data || []);

  }



  useEffect(()=>{

    loadComments();

  },[slug]);





  async function handleSubmit(
    e: React.FormEvent
  ){

    e.preventDefault();

    setLoading(true);

    setMessage("");



    const res = await fetch(
      `${API}/posts/${slug}/comments`,
      {

        method:"POST",

        headers:{
          "Content-Type":"application/json",
          Accept:"application/json",
        },

        body:JSON.stringify({

          name,
          email,
          comment,

        }),

      }
    );



    const data = await res.json();



    if(res.ok){

      setMessage(
        t("success")
      );

      setName("");

      setEmail("");

      setComment("");

    }else{

      setMessage(
        data.message || t("error")
      );

    }


    setLoading(false);

  }





  return (

    <section className="mt-16 border-t pt-10">


      <h2 className="text-3xl font-bold mb-8">
        💬 {t("title")} ({comments.length})
      </h2>



      <div className="space-y-6 mb-10">


        {comments.map((item)=>(

          <div
            key={item.id}
            className="bg-gray-100 rounded-xl p-5"
          >

            <h3 className="font-bold">
              {item.name}
            </h3>


            <p className="text-gray-700 mt-2">
              {item.comment}
            </p>


            <small className="text-gray-500">
              {new Date(
                item.created_at
              ).toLocaleDateString()}
            </small>


          </div>

        ))}



        {comments.length === 0 && (

          <p className="text-gray-500">
            {t("empty")}
          </p>

        )}


      </div>





      <h3 className="text-2xl font-bold mb-5">
        {t("leaveComment")}
      </h3>




      {message && (

        <div className="bg-green-100 text-green-700 p-3 rounded mb-5">

          {message}

        </div>

      )}




      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >


        <input
          required
          value={name}
          onChange={(e)=>setName(e.target.value)}
          placeholder={t("name")}
          className="w-full border rounded-lg p-3"
        />


        <input
          required
          type="email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          placeholder={t("email")}
          className="w-full border rounded-lg p-3"
        />


        <textarea
          required
          value={comment}
          onChange={(e)=>setComment(e.target.value)}
          placeholder={t("comment")}
          rows={5}
          className="w-full border rounded-lg p-3"
        />


        <button
          disabled={loading}
          className="bg-red-600 text-white px-6 py-3 rounded-lg"
        >

          {loading ? t("sending") : t("send")}

        </button>


      </form>



    </section>

  );

}