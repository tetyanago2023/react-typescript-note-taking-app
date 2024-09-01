import {Badge, Button, Card, Col, Form, FormGroup, Row, Stack} from "react-bootstrap"
import {Link} from "react-router-dom"
import ReactSelect from "react-select"
import {useMemo, useState} from "react"
import {Tag} from "./App.tsx"
import styles from "./NoteList.module.css"
import {EditTagsModal} from "./EditTagsModal.tsx";

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
    const [editTagsModalOpen, setEditTagsModalOpen] = useState(false)

    const filteredNotes = useMemo(() => {
        return notes.filter(note => {
            return (title === "" || note.title.toLowerCase().includes(title.toLowerCase())) && (
                selectedTags.length === 0 ||
                selectedTags.every(tag => note.tags.some(noteTag => noteTag.id === tag.id))
            )
        })
    }, [notes, selectedTags, title])

    function NoteCard({ id, title, tags }: SimplifiedNote) {
        return (
            <Card
                as={Link}
                to={`/${id}`}
                className={`h-100 text-reset text-decoration-none ${styles.card}`}
            >
                <Card.Body>
                    <Stack
                        gap={2}
                        className="align-items-center justify-content-center h-100"
                    >
                        <span className="fs-5">{title}</span>
                        {tags.length > 0 && (
                            <Stack
                                gap={1}
                                direction="horizontal"
                                className="justify-content-center flex-wrap"
                            >
                                {tags.map(tag => (
                                    <Badge className="text-truncate" key={tag.id}>
                                        {tag.label}
                                    </Badge>
                                ))}
                            </Stack>
                        )}
                    </Stack>
                </Card.Body>
            </Card>
        )
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
                        <Button
                            onClick={() => setEditTagsModalOpen(true)}
                            variant="outlined-secondary">
                            Edit Tags
                        </Button>
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
            <EditTagsModal
                show={editTagsModalOpen}
                handleClose={() => setEditTagsModalOpen(false)}
                availableTags={availableTags}/>
        </>
    )
}