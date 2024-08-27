import {Button, Col, Form, FormGroup, Row, Stack} from "react-bootstrap";
import {Link} from "react-router-dom";
import ReactSelect from "react-select";
import {useState} from "react";
import {Tag} from "./App.tsx";

type NoteListProps = {
    availableTags: Tag[]
}
export function NoteList({ availableTags }: NoteListProps) {
    const [selectedTags, setSelectedTags] = useState<Tag[]>([])
    const [title, SetTitle] = useState("")

    return (
        <>
            <Row>
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
        </>
    )
}