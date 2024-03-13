import { pgTable, varchar, timestamp, pgEnum } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { postTable } from './post.schema'
import { commentTable } from './comment.schema'

export const roleEnum = pgEnum('role', ['admin', 'user'])

export const userTable = pgTable('users', {
  id: varchar('id', { length: 255 }).notNull().primaryKey(),
  avatarUrl: varchar('avatarUrl', { length: 255 }),
  username: varchar('username', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  password: varchar('password', { length: 255 }).notNull(),
  role: roleEnum('role'),
  createdAt: timestamp('created_at').defaultNow(),
})

export const userRelations = relations(userTable, ({ many }) => ({
  posts: many(postTable),
  comments: many(commentTable),
}))
