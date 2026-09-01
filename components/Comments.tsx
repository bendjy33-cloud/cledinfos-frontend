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

  /*
  |--------------------------------------------------------------------------
  | LOAD COMMENTS
  |--------------------------------------------------------------------------
  */

  async function loadComments() {
    try {
      const res = await fetch(
        `${API}/posts/${slug}/comments`,
        {
          cache: "no-store",
        }
      );

      const data = await res.json();

      setComments(data.data || []);
    } catch (error) {
      console.error(
        "Error loading comments:",
        error
      );
    }
  }

  /*
  |--------------------------------------------------------------------------
  | LOAD COMMENTS ON PAGE LOAD
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    loadComments();
  }, [slug]);

  /*
  |--------------------------------------------------------------------------
  | SUBMIT COMMENT
  |--------------------------------------------------------------------------
  */

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(
        `${API}/posts/${slug}/comments`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },

          body: JSON.stringify({
            name,
            email,
            comment,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setMessage(
          t("success")
        );

        setName("");
        setEmail("");
        setComment("");

        // Reload comments
        await loadComments();
      } else {
        setMessage(
          data.message ||
            t("error")
        );
      }
    } catch (error) {
      console.error(
        "Error submitting comment:",
        error
      );

      setMessage(
        t("error")
      );
    }

    setLoading(false);
  }

  /*
  |--------------------------------------------------------------------------
  | RENDER
  |--------------------------------------------------------------------------
  */

  return (
    <section
      className="
        mt-16

        border-t
        border-gray-200

        pt-10

        text-gray-900

        max-sm:!text-black
        max-sm:[&_*]:!text-black
      "
    >

      {/* =====================================================
          COMMENTS TITLE
      ===================================================== */}

      <h2
        className="
          text-3xl

          font-bold

          mb-8

          text-gray-900

          max-sm:!text-black
        "
      >
        💬 {t("title")} ({comments.length})
      </h2>


      {/* =====================================================
          COMMENTS LIST
      ===================================================== */}

      <div
        className="
          space-y-6

          mb-10

          max-sm:!text-black
        "
      >

        {comments.map((item) => (
          <div
            key={item.id}

            className="
              bg-gray-100

              rounded-xl

              p-5

              text-gray-900

              max-sm:!text-black
              max-sm:[&_*]:!text-black
            "
          >

            {/* COMMENT AUTHOR */}

            <h3
              className="
                font-bold

                text-gray-900

                max-sm:!text-black
              "
            >
              {item.name}
            </h3>


            {/* COMMENT */}

            <p
              className="
                text-gray-700

                mt-2

                leading-7

                text-gray-900

                max-sm:!text-black
              "
            >
              {item.comment}
            </p>


            {/* COMMENT DATE */}

            <small
              className="
                text-gray-500

                block

                mt-3

                text-gray-900

                max-sm:!text-black
              "
            >
              {new Date(
                item.created_at
              ).toLocaleDateString()}
            </small>

          </div>
        ))}


        {/* =================================================
            NO COMMENTS
        ================================================= */}

        {comments.length === 0 && (
          <p
            className="
              text-gray-500

              text-gray-900

              max-sm:!text-black
            "
          >
            {t("empty")}
          </p>
        )}

      </div>


      {/* =====================================================
          LEAVE COMMENT TITLE
      ===================================================== */}

      <h3
        className="
          text-2xl

          font-bold

          mb-5

          text-gray-900

          max-sm:!text-black
        "
      >
        {t("leaveComment")}
      </h3>


      {/* =====================================================
          SUCCESS / ERROR MESSAGE
      ===================================================== */}

      {message && (
        <div
          className="
            bg-green-100

            text-green-700

            p-3

            rounded

            mb-5

            max-sm:!text-black
          "
        >
          {message}
        </div>
      )}


      {/* =====================================================
          COMMENT FORM
      ===================================================== */}

      <form
        onSubmit={handleSubmit}

        className="
          space-y-4

          text-gray-900

          max-sm:!text-black
        "
      >

        {/* =================================================
            NAME
        ================================================= */}

        <input
          required

          value={name}

          onChange={(e) =>
            setName(e.target.value)
          }

          placeholder={t("name")}

          className="
            w-full

            border
            border-gray-300

            rounded-lg

            p-3

            bg-white

            text-gray-900

            placeholder:text-gray-500

            focus:outline-none
            focus:ring-2
            focus:ring-red-500

            max-sm:!text-black
            max-sm:placeholder:!text-gray-600
          "
        />


        {/* =================================================
            EMAIL
        ================================================= */}

        <input
          required

          type="email"

          value={email}

          onChange={(e) =>
            setEmail(e.target.value)
          }

          placeholder={t("email")}

          className="
            w-full

            border
            border-gray-300

            rounded-lg

            p-3

            bg-white

            text-gray-900

            placeholder:text-gray-500

            focus:outline-none
            focus:ring-2
            focus:ring-red-500

            max-sm:!text-black
            max-sm:placeholder:!text-gray-600
          "
        />


        {/* =================================================
            COMMENT TEXTAREA
        ================================================= */}

        <textarea
          required

          value={comment}

          onChange={(e) =>
            setComment(e.target.value)
          }

          placeholder={t("comment")}

          rows={5}

          className="
            w-full

            border
            border-gray-300

            rounded-lg

            p-3

            bg-white

            text-gray-900

            placeholder:text-gray-500

            focus:outline-none
            focus:ring-2
            focus:ring-red-500

            resize-y

            max-sm:!text-black
            max-sm:placeholder:!text-gray-600
          "
        />


        {/* =================================================
            SEND BUTTON
        ================================================= */}

        <button
          type="submit"

          disabled={loading}

          className="
            bg-red-600

            hover:bg-red-700

            disabled:opacity-60

            text-white
            !text-white

            px-6
            py-3

            rounded-lg

            font-semibold

            transition
          "
        >
          {loading
            ? t("sending")
            : t("send")}
        </button>

      </form>

    </section>
  );
}