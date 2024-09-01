import {Button, Col, Form, Modal, Row, Stack} from "react-bootstrap";
import {Tag} from "./App.tsx";

type EditTagsModalProps = {
    availableTags: Tag[]
    handleClose: () => void
    show: boolean

}

export function EditTagsModal({ availableTags, handleClose, show }: EditTagsModalProps) {
    return (
        <Modal show={show} onhide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Tags</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Stack gap={2}>
                        {availableTags.map(tag => (
                            <Row key={tag.id}>
                                <Col>
                                    <Form.Control type={"text"} value={tag.label} />

                                </Col>
                                <Col xs={"auto"}>
                                    <Button variant="outline-danger">&times;</Button>
                                </Col>
                            </Row>

                        ))}
                    </Stack>
                </Form>
            </Modal.Body>
        </Modal>
    )
}