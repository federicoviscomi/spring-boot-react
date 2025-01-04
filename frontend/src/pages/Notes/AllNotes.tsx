import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiFilePlus } from 'react-icons/fi';
import { Blocks } from 'react-loader-spinner';
import toast from 'react-hot-toast';

import api from '../../services/api.ts';
import NoteItems from './NoteItems.tsx';
import Error from '../../shared-components/Error.tsx';
import { Note } from '../../types/note.ts';
import axios from 'axios';
import { Box, Button, Grid } from '@mui/material';

const renderSkeleton = () => (
  <div className="flex flex-col justify-center items-center h-72">
    <span>
      <Blocks
        height="70"
        width="70"
        color="#4fa94d"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        visible={true}
      />
    </span>
    <span>Please wait...</span>
  </div>
);

const renderNotes = (notes: Note[]) => (
  <div>
    <h1 className="font-montserrat text-slate-800 sm:text-4xl text-2xl font-semibold ">
      My Notes
    </h1>

    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {notes.map((note) => (
          <Grid item xs={2} sm={4} md={4} key={note.id}>
            <NoteItems
              key={note.id}
              id={note.id}
              parsedContent={JSON.parse(note.content).content}
              createdAt={note.createdAt}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  </div>
);

const renderEmptyNotes = () => (
  <div className="flex flex-col items-center justify-center min-h-96 p-4">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        You did not create any note yet
      </h2>
      <p className="text-gray-600 mb-6">
        Start by creating a new note to keep track of your thoughts.
      </p>
      <div className="w-full flex justify-center">
        <Link to="/create-note">
          <Button>
            <FiFilePlus className="mr-2" size={24} />
            Create New Note
          </Button>
        </Link>
      </div>
    </div>
  </div>
);

const AllNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const { data } = await api.get<Note[]>('/notes');
      setNotes(data);
    } catch (error) {
      if (error && axios.isAxiosError(error)) {
        setError(error.response?.data.message);
      } else {
        setError('Error fetching notes ' + error);
      }
      toast.error('Error fetching notes ' + error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    //calling the function here to fetch all notes
    fetchNotes();
  }, []);

  //to show an errors
  if (error) {
    return <Error message={error} />;
  }

  if (loading) {
    return renderSkeleton();
  }

  return (
    <div className="min-h-[calc(100vh-74px)] sm:py-10 sm:px-5 px-0 py-4">
      <div className="w-[92%] mx-auto ">
        {notes.length === 0 ? renderEmptyNotes() : renderNotes(notes)}
      </div>
    </div>
  );
};

export default AllNotes;
