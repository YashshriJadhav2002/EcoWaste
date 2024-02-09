import { useEffect, useRef, useState } from 'react'
import Input from '../../chatBox/Input'
import '../../../Styles/chat.css'
import { io } from 'socket.io-client'

const Dashboard = () => {
	const [currentuser, setUser] = useState(localStorage.getItem('user'))
	const userId=localStorage.getItem('product_id')

	const [conversations, setConversations] = useState([])
	const [messages, setMessages] = useState({})
	const [message, setMessage] = useState('')
	const [users, setUsers] = useState([])
	const [socket, setSocket] = useState(null)
	const messageRef = useRef(null)
	const [formData, setFormData] = useState({
		Name: '',
		
		Avatar: null,
	  });


	

	useEffect(() => {
		setSocket(io('http://localhost:8002'))
	}, [])

	useEffect(()=> {

		const fetchUser = async() => {
	
	
		  const token = localStorage.getItem("vendor-token")
		  
		  const res=await fetch('/api/vendor/profile',
		  {
			method:"POST",
			headers:
			{
			"Content-Type":"application/json",
			},
			body: JSON.stringify({
			  auth_token: token
			})
		  })
	
			const data=await res.json()
			if(res.status===200)
			{
			  
			  setFormData({
	
				  Name: data.data.Name,
			
				 
				  Avatar: data.data.Avatar,
				  
	
			  })
	
	
			}
		}
		
		fetchUser()
	
	  }, [])

	useEffect(() => {
		socket?.emit('addUser', currentuser);
		socket?.on('getUsers', users => {
			console.log('activeUsers :>> ', users);
			alert("active Users ",users)
		})
		socket?.on('getMessage', data => {
			setMessages(prev => ({
				...prev,
				messages: [...prev.messages, { user: data.user, message: data.message ,conversationId:data.conversationId,senderId:data.senderId}]
			}))
		})

		
	}, [socket])

	useEffect(() => {
		messageRef?.current?.scrollIntoView({ behavior: 'smooth' })
	}, [messages?.messages])

	useEffect(() => {
		const loggedInUser = localStorage.getItem('user')
		const fetchConversations = async () => {
			const res = await fetch(`/api/conversations/?userId=${loggedInUser}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				}
			});
			const resData = await res.json()
			setConversations(resData)
		}
		fetchConversations()
	}, [])

	useEffect(() => {
		if(userId!=null)
		{
			const fetchUsers = async () => {
				const res1=await fetch('/api/vendor/exactprice',{
					method:'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body:JSON.stringify({
						product_id:userId
					  })
				});
				const data=await res1.json()
				const id=data.data.user_id
				const res = await fetch(`/api/users/?userId=${id}`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					}
					
				});
				const resData = await res.json()
				setUsers(resData)
			}
			fetchUsers()

		}

		
	}, [])

	const fetchMessages = async (conversationId, receiver) => {
		if (conversationId === 'new') {
			const user = await fetchUserData(receiver); 
			setMessages({ messages: [], receiver: user, conversationId: 'new' });

		} else {
			const res = await fetch(`/api/message/?conversationId=${conversationId}&senderId=${currentuser}&receiverId=${receiver}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				}
			});
			const resData = await res.json();
			setMessages({ messages: resData, receiver, conversationId });
			console.log(messages?.receiver)
		}
	};
	
	const fetchUserData = async (userId) => {
		const res = await fetch(`/api/users/?userId=${userId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			}
		});
		const resData = await res.json();
		return resData[0].user; // Assuming the response structure is an array with a single user object
	};

	const sendMessage = async (e) => {
		setMessages(prev => ({
			...prev,
			messages: [...prev.messages, { user: { id: currentuser, Name: formData.Name, Avatar: formData.Avatar }, message }],
			receiver: messages.receiver, 
			conversationId: messages.conversationId // You might need to update the conversationId as well
		}));
		socket?.emit('sendMessage', {
			senderId: currentuser,
			receiverId: messages?.receiver?.receiverId,
			message,
			conversationId: messages?.conversationId
		});
		const res = await fetch('/api/message', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				conversationId: messages?.conversationId,
				senderId: currentuser,
				message,
				receiverId: messages?.receiver?.receiverId
			})
		});

		setMessage('')



	}

	return (
		<div className=' w-screen flex'>
			<div className=' w-[25%] h-screen bg-secondary overflow-scroll'>
				<div className=' flex items-center my-8 mx-14'>
				<div><img src={formData?.Avatar} className=" w-[60px] h-[60px] rounded-full p-[2px] border border-primary" /></div>

					<div className='ml-8'>
						<h3 className='text-2xl'>{formData.Name}</h3>
						<p className=' text-lg font-light'>My Account</p>
					</div>
				</div>
				<hr />
				<div className='mx-14 mt-10'>
					<div className=' text-primary text-lg'>Messages</div>
					<div>
						{
							conversations.length > 0 ?
								conversations.map(({ conversationId, user }) => {
									return (
										<div className=' flex items-center py-8 border-b border-b-gray-300'>
											<div className=' cursor-pointer flex items-center' onClick={function()
											{
												
												 fetchMessages(conversationId, user)
												
											}
											}>

												<div><img src={user?.Avatar} className="w-[60px] h-[60px] rounded-full p-[2px] border border-primary" /></div>
												<div className='ml-6'>
													<h3 className='text-lg font-semibold'>{user?.Name}</h3>
													<p className='text-sm font-light text-gray-600'>{user?.Email}</p>
												</div>
											</div>
										</div>
									)
								}) : <div className=' text-center text-lg font-semibold mt-24'>No Conversations</div>
						}
					</div>
				</div>
			</div>
			<div className=' w-[50%] h-screen bg-white flex flex-col items-center'>
				{
					messages?.receiver?.Name &&
					<div className='w-[75%] bg-secondary h-[80px] my-14 rounded-full flex items-center px-14 py-2'>
						<div className=' cursor-pointer'><img src={messages?.receiver?.Avatar} width={60} height={60} className=" w-[60px] h-[60px] rounded-full" /></div>
						<div className=' ml-6 mr-auto'>
							<h3 className=' text-lg'>{messages?.receiver?.Name}</h3>
							<p className=' text-sm font-light text-gray-600'>{messages?.receiver?.Email}</p>
						</div>
						<div className=' cursor-pointer'>
							<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-phone-outgoing" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" fill="none" stroke-linecap="round" stroke-linejoin="round">
								<path stroke="none" d="M0 0h24v24H0z" fill="none" />
								<path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
								<line x1="15" y1="9" x2="20" y2="4" />
								<polyline points="16 4 20 4 20 8" />
							</svg>
						</div>
					</div>
				}
				<div className=' h-[75%] w-full overflow-scroll shadow-sm'>
					<div className=' p-14'>
					{
							messages?.messages?.length > 0 ?
								messages.messages.map(({ message, user}) => {
									return (
										<>
										{
											user.id==currentuser?
										<div class="flex justify-end mb-4">
											<div className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
											{message}
											</div>
										<div ref={messageRef}></div>
										</div>: 
										<div class="flex justify-start mb-4">
										<div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
											{message}
										</div>
										<div ref={messageRef}></div>
           								</div>
										
										}
										</>
									)
								}) : <div className=' text-center text-lg font-semibold mt-24'>No Messages or No Conversation Selected</div>
						}
					</div>
				</div>
				{
					messages?.receiver?.Name &&
					<div className=' p-14 w-full flex items-center'>
						<Input placeholder='Type a message...' value={message} onChange={(e) => setMessage(e.target.value)} className='w-[75%]' inputClassName='p-4 border-0 shadow-md rounded-full bg-light focus:ring-0 focus:border-0 outline-none' />
						<div className={` ml-4 p-2 cursor-pointer bg-light rounded-full ${!message && 'pointer-events-none'}`} onClick={function(){
							sendMessage()
						}}>
							<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-send" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
								<path stroke="none" d="M0 0h24v24H0z" fill="none" />
								<line x1="10" y1="14" x2="21" y2="3" />
								<path d="M21 3l-6.5 18a0.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a0.55 .55 0 0 1 0 -1l18 -6.5" />
							</svg>
						</div>
						<div className={` ml-4 p-2 cursor-pointer bg-light rounded-full ${!message && 'pointer-events-none'}`}>
							<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-plus" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
								<path stroke="none" d="M0 0h24v24H0z" fill="none" />
								<circle cx="12" cy="12" r="9" />
								<line x1="9" y1="12" x2="15" y2="12" />
								<line x1="12" y1="9" x2="12" y2="15" />
							</svg>
						</div>
					</div>
				}
			</div>
			<div className=' w-[25%] h-screen bg-light px-8 py-16 overflow-scroll'>
				<div className=' text-primary text-lg'>People</div>
				<div>
					{
						
						users.length > 0 ?
						users.map(({ user }) => {
									return (
									<div className=' flex items-center py-8 border-b border-b-gray-300'>
										<div className=' cursor-pointer flex items-center' onClick={() => fetchMessages('new', user.receiverId)}>
											<div><img src={user?.Avatar} className=" w-[60px] h-[60px] rounded-full p-[2px] border border-primary" /></div>
											<div className=' ml-6'>
												<h3 className=' text-lg font-semibold'>{user?.Name}</h3>
												<p className=' text-sm font-light text-gray-600'>{user?.Email}</p>
											</div>
										</div>
									</div>
									)
								})
							 : <div className=' text-center text-lg font-semibold mt-24'>No Conversations</div>
					}
				</div>
			</div>
		</div>
	)
}

export default Dashboard