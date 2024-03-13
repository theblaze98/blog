import { pgTable, varchar, text, timestamp } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { userTable } from './user.schema'
import { postTable } from './post.schema'

export const commentTable = pgTable('comments', {
  id: varchar('id', { length: 255 }).primaryKey(),
  postId: varchar('postId', { length: 255 })
    .notNull()
    .references(() => postTable.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  authorId: varchar('authorId', { length: 255 })
    .notNull()
    .references(() => userTable.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  content: text('content').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
})

export const commentRelations = relations(commentTable, ({ one }) => ({
  post: one(postTable, {
    fields: [commentTable.postId],
    references: [postTable.id],
  }),
  author: one(userTable, {
    fields: [commentTable.authorId],
    references: [userTable.id],
  }),
}))
