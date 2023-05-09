import React, { useState, useEffect } from 'react'
import moment from 'moment'
import parse from 'html-react-parser'
import { getComments } from '@/services/comments'
import { CommentProps } from '@/models/comment'
import { changeWord } from '@/helpers/utils'

type Props = {
  slug: string
}

const Comments = ({ slug }: Props) => {
  const [comments, setComments] = useState<CommentProps[]>([])

  useEffect(() => {
    getComments(slug)
      .then((res) => setComments(res))
  }, [])

  return (
    <div>
      {comments.length > 0 && 
        <div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8'>
          <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
            {comments.length}
            {' '}
            {changeWord(comments.length > 1, 'Comment', 'Comments')}
          </h3>
          {comments.map((comment: CommentProps, i: number) => (
            <div
              key={i}
              className={`border-b ${(i !== comments.length - 1) && 'border-gray-400'} mb-4 pb-4`}
            >
              <p className='mb-4'>
                <span className='font-semibold'>
                  {comment.name}
                </span>
                {' '}
                on
                {' '}
                {moment(comment.createdAt).format('MMM DD, YYYY')}
              </p>
              <p className='whitespace-pre-line text-gray-600 w-full ml-2'>{comment.comment}</p>
            </div>
          ))}
        </div>
      }
    </div>
  )
}

export default Comments