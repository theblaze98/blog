import { pgTable, varchar, text, timestamp } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { userTable } from './user.schema'
import { commentTable } from './comment.schema'

export const postTable = pgTable('posts', {
  id: varchar('id', { length: 255 }).notNull().primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content').notNull(),
  imageUrl: varchar('imageUrl'),
  authorId: varchar('authorId', { length: 255 })
    .notNull()
    .references(() => userTable.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  createdAt: timestamp('createdAt').defaultNow(),
})

export const postRelations = relations(postTable, ({ one, many }) => ({
  author: one(userTable, {
    fields: [postTable.authorId],
    references: [userTable.id],
  }),
  comments: many(commentTable),
}))
