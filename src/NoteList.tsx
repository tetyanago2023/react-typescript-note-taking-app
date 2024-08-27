import {Button, Col, Form, FormGroup, Row, Stack} from "react-bootstrap";
import {Link} from "react-router-dom";
import ReactSelect from "react-select";
import {useMemo, useState} from "react";
import {Tag} from "./App.tsx";

type SimplifiedNote = {
    id: string
    title: string
    tags: Tag[]
}

type NoteListProps = {
    availableTags: Tag[]
    notes: SimplifiedNote[]
}
export function NoteList({ availableTags, notes }: NoteListProps) {
    const [selectedTags, setSelectedTags] = useState<Tag[]>([])
    const [title, SetTitle] = useState("")

    const filteredNotes = useMemo(() => {
        return notes.filter(note => {
            return (title === "" || note.title.toLowerCase().includes(title.toLowerCase())) && (
                selectedTags.length === 0 ||
                selectedTags.every(tag => note.tag.some(noteTag => noteTag.id === tag.id))
            )
        })
    }, [notes, selectedTags, title])

    function NoteCard({ id, title, tags }: SimplifiedNote) {
        return <h1>Hi</h1>
    }

    return (
        <>
            <Row className="align-items-center mb-4">
                <Col>
                    <h1>Notes</h1>
                </Col>
                <Col xs="auto">
                    <Stack direction="horizontal" gap={2}>
                        <Link to="/new">
                            <Button variant="primary">Create</Button>
                        </Link>
                        <Button variant="outlined-secondary">Edit Tags</Button>
                    </Stack>
                </Col>
            </Row>
            <Form>
                <Row className="mb-4">
                    <Col>
                        <FormGroup id={"title"}>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                value={title}
                                onChange={e => SetTitle(e.target.value)}/>
                        </FormGroup>
                    </Col>
                    <Col>
                        <Form.Group controlId={"tags"}>
                            <Form.Label>Tags</Form.Label>
                            <ReactSelect
                                value={selectedTags.map(tag => {
                                    return { label: tag.label, value: tag.id }
                                })}
                                options={availableTags.map(tag => {
                                    return { label: tag.label, value: tag.id }
                                })}
                                onChange={tags => {
                                    setSelectedTags(
                                        tags.map(tag => {
                                            return { label: tag.label,  id: tag.value }
                                        })
                                    )
                                }}
                                isMulti
                            />
                        </Form.Group>
                    </Col>
                </Row>

            </Form>
            <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
                {filteredNotes.map(note => (
                    <Col key={note.id}>
                        <NoteCard id={note.id} title={note.title} tags={note.tags}/>
                    </Col>
                ))}
            </Row>
        </>
    )
}