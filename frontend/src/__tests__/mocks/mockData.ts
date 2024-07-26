export const mockData = [
  {
    data: {
      content: 'Post 1',
      imageUrl: 'https://res.cloudinary.com/dwrj7jem6/image/upload/v1712130562/samples/food/fish-vegetables.jpg',
      createdAt: 1705307025000,
      updatedAt: 1721844626715,
      username: 'user1',
      numberOfLikes: 10,
      likes: ['JOh3hV', 'lFitdZ', 'TY6hpQ', 'eA6N8o', '5lsyvS', 'sACc8j', '4NaAxA', 'Uu7mNJ', 'w7EB1F', 'vaqBUH'],
    },
    id: 1,
  },
  {
    data: {
      content: 'Post 2',
      imageUrl: 'https://res.cloudinary.com/dwrj7jem6/image/upload/v1712130585/samples/breakfast.jpg',
      createdAt: 1718439825000,
      updatedAt: 1721844589365,
      username: 'user1',
      numberOfLikes: 2,
      likes: ['NsDahn', 'pJswtA'],
    },
    id: 2,
  },
  {
    data: {
      content: 'Post 3',
      imageUrl: null,
      createdAt: 1716193425000,
      updatedAt: 1721844606481,
      username: 'user2',
      numberOfLikes: 7,
      likes: ['y5XZKT', 'UXKUxd', 'fCLejG', 'R1j7Hj', 'hKQQtk', 'FglGOh', 'qnEQJ2'],
    },
    id: 3,
  },
];

// Sample list of posts
export const mockPosts = mockData.map((post) => ({ ...post.data, id: post.id }));

// Single post
export const mockPost = mockPosts[0];
