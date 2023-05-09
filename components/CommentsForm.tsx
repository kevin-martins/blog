import React, { useState, useEffect, useRef } from 'react'
import { submitComment } from '@/services/comments'

type Props = {
  slug: string
}

type UseRefProps = {
  value: string
}

const CommentsForm = ({ slug }: Props) => {
  const [error, setError] = useState(false)
  const [localStorage, setLocalStorage] = useState(null)
  const [showSuccessMsg, setShowSuccessMsg] = useState(false)
  const commentRef = useRef<HTMLTextAreaElement>()
  const nameRef = useRef<HTMLTextAreaElement>()
  const emailRef = useRef<HTMLTextAreaElement>()
  const storeDataRef = useRef()

  useEffect(() => {
    nameRef.current.value = window.localStorage.getItem('name')
    emailRef.current.value = window.localStorage.getItem('email')
  }, [])

  const handleCommentSubmission = () => {
    setError(false)

    const { value: comment } = commentRef.current
    const { value: name } = nameRef.current
    const { value: email } = emailRef.current
    const { checked: storeData } = storeDataRef.current

    if (!comment || !name || !email) {
      setError(true)
      return
    }

    const commentObj = { name, email, comment, slug }

    if (storeDataRef) {
      window.localStorage.setItem('name', name)
      window.localStorage.setItem('email', email)
    } else {
      window.localStorage.removeItem('name')
      window.localStorage.removeItem('email')
    }

    submitComment(commentObj)
      .then(res => {
        setShowSuccessMsg(true)

        setTimeout(() => {
          setShowSuccessMsg(false)
        }, 3000)
      })
  }

  return (
    <div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8'>
      <h3 className='text-xl mb-8 font-semibold border-b pb-4'>Leave a Reply</h3>
      <div className='grid grid-cols-1 gap-4 mb-4'>
        <textarea
          className='p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
          ref={commentRef}
          placeholder='Comment'
          name="comment"
        />
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4'>
        <input
          ref={nameRef}
          type="text"
          className='py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
          placeholder='Name'
          name="name"
        />
        <input
            ref={emailRef}
            type="text"
            className='py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
            placeholder='Email'
            name="email"
          />
      </div>
      <div className='grid grid-cols-1 gap-4 mb-4'>
        <div>
          <input
            ref={storeDataRef}
            type="checkbox"
            id="storeData"
            name="storeData"
            value="true"
          />
          <label
            className='text-gray-500 cursor-pointer ml-1'
            htmlFor='storeData'
          >
            Save my personal informations
          </label>
        </div>
      </div>
      {error && <p className='text-xs text-red-500'>All fields are required</p>}
      <div className='mt-8'>
        <button
          type="button"
          onClick={handleCommentSubmission}
          className='transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-full text-white px-8 py-3 cursor-pointer'
        >
          Post Comment
        </button>
        {showSuccessMsg &&
          <span className='text-xl float-right font-semibold mt-3 text-green-300'>
            Comment submitted for review
          </span>
        }
      </div>
    </div>
  )
}

export default CommentsForm