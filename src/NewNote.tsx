import {NoteForm} from "./NoteForm.tsx";
import {NoteData, Tag} from "./App.tsx";

type NewNoteProps = {
    onSubmit: (data: NoteData) => void
    onAddTag: (tag: Tag) => void
    availableTags: Tag[]
}

export function NewNote({ onSubmit, onAddTag, availableTags }: NewNoteProps ) {
  return (
    <>
        <h1 className={"mb-4"}>New Note</h1>
        <NoteForm  onSubmit={onSubmit} onAddTag={onAddTag} availableTags={availableTags}/>
    </>
  );
}