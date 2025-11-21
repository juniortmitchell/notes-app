import {
    Box,
    Button,
    Typography,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
    TextField,
    Chip,
    Container,
} from "@mui/material"
import {
    Home as HomeIcon,
    Archive as ArchiveIcon,
    Delete as DeleteIcon,
    Add as AddIcon,
    Save as SaveIcon,
} from "@mui/icons-material"
import { useState, useEffect } from "react"
import "./notesStyles.css"
import { useNavigate } from "react-router-dom"
import { getNotes } from "../../services/api"

export default function Notes() {
    const navigate = useNavigate()
    const [notes, setNotes] = useState([])

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/login")
        }
    }, [navigate])

    useEffect(() => {
        // Fetch notes from the backend when component mounts
        async function fetchNotes() {
            const token = localStorage.getItem("token")
            if (token) {
                const response = await getNotes(token)
                if (response.success) {
                    setNotes(response.data.notes)

                    if (response.data.notes.length > 0) {
                        setSelectedNote(response.data.notes[0])
                    }
                } else {
                    console.error("Failed to fetch notes:", response.error)
                }
            }
        }
        fetchNotes()
    }, [])

    const [selectedNote, setSelectedNote] = useState(null)

    const handleNoteChange = (field) => (e) => {
        setSelectedNote({
            ...selectedNote,
            [field]: e.target.value,
        })
    }

    return (
        <Container className="notes-container" maxWidth={false}>
            {/* 1. Left Sidebar - Navigation */}
            <Box className="notes-sidebar">
                <List>
                    <ListItem disablePadding>
                        <ListItemButton selected>
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="All Notes"
                                slotProps={{
                                    primary: { fontWeight: "medium" },
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <ArchiveIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="Archived Notes"
                                slotProps={{
                                    primary: { fontWeight: "medium" },
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>

            {/* 2. Middle Column - Note List */}
            <Box className="notes-list-column">
                <Box sx={{ p: 2 }}>
                    <Button
                        id="button"
                        variant="contained"
                        startIcon={<AddIcon />}
                        fullWidth
                    >
                        Create New Note
                    </Button>
                </Box>

                <List sx={{ overflow: "auto", flex: 1, px: 2 }}>
                    {notes.map((note) => (
                        <ListItem key={note.id} disablePadding sx={{ mb: 1 }}>
                            <ListItemButton
                                selected={selectedNote.id === note.id}
                                onClick={() => setSelectedNote(note)}
                                sx={{
                                    flexDirection: "column",
                                    alignItems: "flex-start",
                                    borderRadius: 2,
                                    p: 2,
                                    backgroundColor:
                                        selectedNote?.id === note.id
                                            ? "#fff"
                                            : "transparent",
                                    boxShadow:
                                        selectedNote?.id === note.id
                                            ? "0 2px 4px rgba(0,0,0,0.05)"
                                            : "none",
                                }}
                            >
                                <Typography
                                    variant="subtitle1"
                                    fontWeight="bold"
                                    sx={{ mb: 1 }}
                                >
                                    {note.title || "Untitled Note"}
                                </Typography>
                                <Box
                                    sx={{
                                        display: "flex",
                                        gap: 0.5,
                                        mb: 1,
                                        flexWrap: "wrap",
                                    }}
                                >
                                    {/* {note.tags &&
                                        note.tags.map((tag) => (
                                            <Chip
                                                key={tag}
                                                label={tag}
                                                size="small"
                                                sx={{
                                                    fontSize: "0.7rem",
                                                    height: 20,
                                                    backgroundColor: "#e5e7eb",
                                                }}
                                            />
                                        ))} */}
                                </Box>
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                >
                                    {note.date}
                                </Typography>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>

            {/* 3. Right Column - Editor */}
            <Box className="notes-editor-column">
                {selectedNote ? (
                    <>
                        <Box className="editor-header">
                            <Box sx={{ pt: 3, flex: 1, mr: 4 }}>
                                <TextField
                                    variant="standard"
                                    fullWidth
                                    placeholder="Untitled Note"
                                    value={selectedNote.title}
                                    onChange={handleNoteChange("title")}
                                    slotProps={{
                                        input: {
                                            disableUnderline: true,
                                            sx: {
                                                fontSize: "2.125rem", // Matches h4 size
                                                fontWeight: "bold",
                                                mb: 1,
                                            },
                                        },
                                    }}
                                />

                                <Box
                                    sx={{
                                        display: "flex",
                                        gap: 3,
                                        mb: 2,
                                        color: "text.secondary",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1,
                                        }}
                                    >
                                        <Typography
                                            variant="body2"
                                            fontWeight="bold"
                                        >
                                            Tags: Coming soon
                                        </Typography>
                                        {/* {selectedNote.tags.map((tag) => (
                                            <Typography
                                                key={tag}
                                                variant="body2"
                                            >
                                                {tag},
                                            </Typography>
                                        ))} */}
                                    </Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1,
                                        }}
                                    >
                                        <Typography
                                            variant="body2"
                                            fontWeight="bold"
                                        >
                                            Last edited:
                                        </Typography>
                                        <Typography variant="body2">
                                            {new Date(
                                                selectedNote.updatedAt
                                            ).toLocaleDateString("en-US", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>

                            {/* Action Buttons (Top Right) */}
                            <Box className="editor-actions" sx={{ pt: 3 }}>
                                <Button
                                    variant="outlined"
                                    startIcon={<ArchiveIcon />}
                                    sx={{
                                        justifyContent: "flex-start",
                                        textTransform: "none",
                                        color: "#374151",
                                        borderColor: "#d1d5db",
                                    }}
                                >
                                    Archive Note
                                </Button>
                                <Button
                                    variant="outlined"
                                    startIcon={<DeleteIcon />}
                                    sx={{
                                        justifyContent: "flex-start",
                                        textTransform: "none",
                                        color: "#374151",
                                        borderColor: "#d1d5db",
                                    }}
                                >
                                    Delete Note
                                </Button>
                            </Box>
                        </Box>

                        {/* <Divider sx={{ my: 2 }} /> */}

                        <Box
                            sx={{
                                flex: 1,
                                overflowY: "auto",
                                minHeight: 0,
                                px: 1,
                            }}
                        >
                            <TextField
                                multiline
                                fullWidth
                                variant="standard"
                                slotProps={{
                                    input: { disableUnderline: true },
                                }}
                                value={selectedNote.content}
                                onChange={handleNoteChange("content")}
                                sx={{
                                    "& .MuiInputBase-root": {
                                        alignItems: "flex-start",
                                    },
                                }}
                            />
                        </Box>

                        {/* Bottom Actions */}
                        <Box
                            sx={{
                                mt: 2,
                                mb: 3,
                                pt: 2,
                                display: "flex",
                                gap: 2,
                                pl: 1,
                                flexShrink: 0, // Prevents buttons from being pushed off or squashed
                                zIndex: 1,
                            }}
                        >
                            <Button
                                id="button"
                                variant="contained"
                                startIcon={<SaveIcon />}
                            >
                                Save Note
                            </Button>
                            <Button
                                variant="outlined"
                                sx={{ flexShrink: 0 }}
                                id="button"
                            >
                                Cancel
                            </Button>
                        </Box>
                    </>
                ) : (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                            color: "text.secondary",
                        }}
                    >
                        <Typography>Select a note to view details</Typography>
                    </Box>
                )}
            </Box>
        </Container>
    )
}
