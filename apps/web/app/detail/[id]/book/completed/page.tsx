import BookCompletedPage from '@/src/views/book/BookCompletedPage';

const page = ({ params: { id } }: { params: { id: number } }) => {
  return <BookCompletedPage />;
};

export default page;
