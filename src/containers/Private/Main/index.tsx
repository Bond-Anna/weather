import React, { useEffect } from 'react'
import { useStore } from 'stores'
import { Comment, Avatar } from 'antd'
import { DislikeOutlined, LikeOutlined } from '@ant-design/icons'

// style
import styles from './styles.module.scss'
import dayjs from 'dayjs'
import { useObserver } from 'mobx-react'

const Main: React.FC = () => {
  const { usersStore } = useStore()

  useEffect(() => {
    usersStore.getData()
  }, [])

  const actions = [
    <span>
      <span>{<LikeOutlined />}</span>
      <span className="comment-action">{0}</span>
    </span>,
    <span>
      <span>{<DislikeOutlined />}</span>
      <span className="comment-action">{0}</span>
    </span>,
    <span key="comment-basic-reply-to">Reply to</span>,
  ]

  const randomColor = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16)
  }

  return useObserver(() => (
    <main className={styles.container}>
      <h1 className={styles.headerName}>Comments</h1>
      <div>
        {usersStore.comments?.map(comment => (
          <Comment
            key={comment.id}
            actions={actions}
            author={<div>{comment.email}</div>}
            avatar={
              <Avatar
                style={{ backgroundColor: `${randomColor()}` }}
                src="https://joeschmoe.io/api/v1/random"
                alt="Avatar"
              />
            }
            content={<p className={styles.body}>{comment.body}</p>}
            datetime={<span>{dayjs().format('MMMM D, YYYY')}</span>}
          />
        ))}
      </div>
    </main>
  ))
}

export default Main
