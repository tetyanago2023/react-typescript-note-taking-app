import {Button, Col, Form, Row, Stack} from "react-bootstrap"
import CreatableReactSelect from "react-select/creatable"
import {Link} from "react-router-dom";
import {FormEvent, useRef, useState} from "react";
import {NoteData, Tag} from "./App.tsx";

type NoteFormProps = {
    onSubmit: (data: NoteData) => void
}
export function NoteForm({ onSubmit }: NoteFormProps) {
    const titleRef = useRef<HTMLInputElement>(null)
    const markdownRef = useRef<HTMLTextAreaElement>(null)
    const [selectedTags, setSelectedTags] = useState<Tag[]>()

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        onSubmit({
            title: titleRef.current!.value,
            markdown: markdownRef.current!.value,
            tags: []
        })
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Stack gap={4}>
                <Row>
                    <Col>
                        <Form.Group controlId={"title"}>
                            <Form.Label>Title</Form.Label>
                            <Form.Control ref={titleRef} required />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId={"tags"}>
                            <Form.Label>Tags</Form.Label>
                            <CreatableReactSelect isMulti />
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group controlId={"markdown"}>
                    <Form.Label>Body</Form.Label>
                    <Form.Control required as={"textarea"} ref={markdownRef} rows={15} />
                </Form.Group>
                <Stack direction={"horizontal"} gap={2} className={"justify-content-end"}>
                    <Button type={"submit"} variant={"primary"}>Save</Button>
                    <Link to={".."}>
                        <Button type={"button"} variant={"outline-secondary"}>Cancel</Button>
                    </Link>
                </Stack>
            </Stack>
        </Form>
    )
}