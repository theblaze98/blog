'use client'
import { useRouter } from 'next/navigation'
import {
	Avatar,
	Card,
	CardHeader,
	CardBody,
	Image,
	CardFooter,
	Divider,
	Popover,
	PopoverTrigger,
	PopoverContent
} from '@nextui-org/react'
import Masonry from 'react-masonry-css'
import { IPostsResponse } from '@/interfaces'
import { getAllPosts } from '@/services/post.service'
import { useEffect, useState } from 'react'
// import posts from '@/mocks/posts.mock.json'

export default function Home() {
	const router = useRouter()
	const [posts, setPots] = useState<IPostsResponse[]>()

	const getPost = async () => {
		try {
			const data = await getAllPosts()
			setPots(data)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		getPost()
	}, [])

	return (
		<>
			<main className='min-h-[calc(100vh-160px)]'>
				<Masonry
					breakpointCols={{
						default: 3,
						1024: 3,
						720: 2,
						640: 1,
					}}
					className='w-11/12 max-w-7xl mx-auto flex'>
					{posts ? (
						posts.map(post => (
							<Card
								className='m-2'
								key={post.id}
								isHoverable
								isPressable
								onClick={() => router.push(`/post/${post.id}`)}>
								<CardHeader className='flex gap-3'>
									<Avatar
										src={post.author.avatarUrl}
										alt={post.author.username}
										size='md'
									/>
									<h2 className='text-xl'>{post.title}</h2>
								</CardHeader>
								<Divider className='w-11/12 mx-auto' />
								<CardBody>
									<p className='text-ellipsis line-clamp-3 mb-2'>
										{post.content}
									</p>
									<Image
										src={post.imageUrl}
										alt={post.title}
									/>
								</CardBody>
								<Divider className='w-11/12 mx-auto' />
								<CardFooter>
									<span className='text-xs text-foreground-400'>
										{post.createdAt}
									</span>
								</CardFooter>
							</Card>
						))
					) : (
						<h2 className='text-3xl'>
							No hay post o hubo un error al encontrarlos
						</h2>
					)}
				</Masonry>
			</main>
		</>
	)
}
