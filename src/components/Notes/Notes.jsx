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

// Mock data to match your image
const mockNotes = [
    {
        id: 1,
        title: "React Performance Optimization",
        date: "29 Oct 2024",
        tags: ["Dev", "React"],
        content:
            "Key performance optimization techniques:\n\n1. Code Splitting\n- Use React.lazy() for route-based splitting\n- Implement dynamic imports for heavy components\n\n2. Memoization\n- useMemo for expensive calculations\n- useCallback for function props",
    },
    {
        id: 2,
        title: "Japan Travel Planning",
        date: "28 Oct 2024",
        tags: ["Travel", "Personal"],
        content: "Itinerary for Tokyo...",
    },
    {
        id: 3,
        title: "Favorite Pasta Recipes",
        date: "27 Oct 2024",
        tags: ["Cooking", "Recipes"],
        content: "Carbonara, Cacio e Pepe...",
    },
]

export default function Notes() {
    const navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/login")
        }
    }, [navigate])

    const [selectedNote, setSelectedNote] = useState(mockNotes[0])

    const handleContentChange = (e) => {
        setSelectedNote({
            ...selectedNote,
            content: e.target.value,
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
                                primaryTypographyProps={{
                                    fontWeight: "medium",
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
                                primaryTypographyProps={{
                                    fontWeight: "medium",
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
                    {mockNotes.map((note) => (
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
                                        selectedNote.id === note.id
                                            ? "#fff"
                                            : "transparent",
                                    boxShadow:
                                        selectedNote.id === note.id
                                            ? "0 2px 4px rgba(0,0,0,0.05)"
                                            : "none",
                                }}
                            >
                                <Typography
                                    variant="subtitle1"
                                    fontWeight="bold"
                                    sx={{ mb: 1 }}
                                >
                                    {note.title}
                                </Typography>
                                <Box
                                    sx={{
                                        display: "flex",
                                        gap: 0.5,
                                        mb: 1,
                                        flexWrap: "wrap",
                                    }}
                                >
                                    {note.tags.map((tag) => (
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
                                    ))}
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
                <Box className="editor-header">
                    <Box sx={{ pt: 3, flex: 1, mr: 4 }}>
                        <Typography variant="h4" fontWeight="bold" gutterBottom>
                            {selectedNote.title}
                        </Typography>

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
                                <Typography variant="body2" fontWeight="bold">
                                    Tags:
                                </Typography>
                                {selectedNote.tags.map((tag) => (
                                    <Typography key={tag} variant="body2">
                                        {tag},
                                    </Typography>
                                ))}
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                }}
                            >
                                <Typography variant="body2" fontWeight="bold">
                                    Last edited:
                                </Typography>
                                <Typography variant="body2">
                                    {selectedNote.date}
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
                        InputProps={{ disableUnderline: true }}
                        value={selectedNote.content}
                        onChange={handleContentChange}
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
            </Box>
        </Container>
    )
}
