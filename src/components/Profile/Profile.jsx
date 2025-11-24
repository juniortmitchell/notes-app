import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
    Alert,
    Avatar,
    Box,
    Button,
    CircularProgress,
    Container,
    Divider,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material"
import { deepPurple } from "@mui/material/colors"
import { getUserProfile, updateUserProfile } from "../../services/api"

const buildFormValues = (data = {}) => {
    const composedName = [data.firstName, data.lastName]
        .filter(Boolean)
        .join(" ")
        .trim()

    return {
        fullName:
            data.fullName ||
            data.displayName ||
            data.name ||
            composedName ||
            "",
        email: data.email || "",
        username: data.username || data.userName || "",
        bio: data.bio || data.about || "",
    }
}

const getDisplayName = (values, profile) => {
    const fallbackFromProfile = (field) => profile?.[field]
    const composedProfileName = [profile?.firstName, profile?.lastName]
        .filter(Boolean)
        .join(" ")
        .trim()

    return (
        values.fullName ||
        values.displayName ||
        fallbackFromProfile("fullName") ||
        fallbackFromProfile("displayName") ||
        fallbackFromProfile("name") ||
        composedProfileName ||
        values.username ||
        fallbackFromProfile("username") ||
        "Your profile"
    )
}

const getInitials = (name) => {
    if (!name) return "?"
    const parts = name.trim().split(" ")
    if (parts.length === 1) {
        return parts[0].charAt(0).toUpperCase()
    }
    return (
        parts[0].charAt(0) + parts[parts.length - 1].charAt(0)
    ).toUpperCase()
}

const getMemberSince = (profile) => {
    if (!profile) return null
    const dateValue =
        profile.createdAt ||
        profile.createdOn ||
        profile.createdDate ||
        profile.created

    if (!dateValue) return null

    const date = new Date(dateValue)
    if (Number.isNaN(date.getTime())) return null

    return date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    })
}

export default function Profile() {
    const navigate = useNavigate()
    const [profile, setProfile] = useState(null)
    const [formValues, setFormValues] = useState(buildFormValues())
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState(null)
    const [successMessage, setSuccessMessage] = useState("")

    const loadProfile = async (token) => {
        setLoading(true)
        setError(null)

        const response = await getUserProfile(token)
        if (response.success) {
            const nextProfile = response.data?.user || response.data
            setProfile(nextProfile)
            setFormValues(buildFormValues(nextProfile || {}))
        } else {
            setError(response.error)
        }

        setLoading(false)
    }

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            setSaving(false)
            navigate("/login")
            return
        }
        loadProfile(token)
    }, [navigate])

    useEffect(() => {
        if (!successMessage) return
        const timer = setTimeout(() => setSuccessMessage(""), 3000)
        return () => clearTimeout(timer)
    }, [successMessage])

    const handleChange = (field) => (event) => {
        const { value } = event.target
        setFormValues((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleSave = async (event) => {
        event.preventDefault()
        setSaving(true)
        setError(null)
        setSuccessMessage("")

        const token = localStorage.getItem("token")
        if (!token) {
            navigate("/login")
            return
        }

        const payload = {
            ...profile,
            ...formValues,
        }

        const response = await updateUserProfile(token, payload)
        if (response.success) {
            const nextProfile = response.data?.user || response.data || payload
            setProfile(nextProfile)
            setFormValues(buildFormValues(nextProfile || {}))
            setSuccessMessage("Profile updated successfully")
        } else {
            setError(response.error)
        }

        setSaving(false)
    }

    const handleRefresh = () => {
        const token = localStorage.getItem("token")
        if (!token) {
            navigate("/login")
            return
        }
        loadProfile(token)
    }

    if (loading) {
        return (
            <Box
                sx={{
                    minHeight: "60vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <CircularProgress />
            </Box>
        )
    }

    return (
        <Container
            maxWidth="md"
            sx={{ py: 6, maxHeight: "80vh", overflow: "auto" }}
        >
            <Paper elevation={3} sx={{ p: { xs: 3, md: 5 } }}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        gap: 3,
                        alignItems: { xs: "flex-start", md: "center" },
                    }}
                >
                    <Avatar
                        sx={{
                            width: 96,
                            height: 96,
                            bgcolor: deepPurple[500],
                            fontSize: "2rem",
                        }}
                    >
                        {getInitials(getDisplayName(formValues, profile))}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="h4" fontWeight={600} gutterBottom>
                            {getDisplayName(formValues, profile)}
                        </Typography>
                        <Typography color="text.secondary" sx={{ mb: 1 }}>
                            {formValues.email ||
                                "Add an email so we can keep in touch."}
                        </Typography>
                        {getMemberSince(profile) && (
                            <Typography variant="body2" color="text.secondary">
                                Member since {getMemberSince(profile)}
                            </Typography>
                        )}
                    </Box>
                    <Button variant="outlined" onClick={handleRefresh}>
                        Refresh
                    </Button>
                </Box>

                <Divider sx={{ my: 4 }} />

                <Stack spacing={2}>
                    {error && <Alert severity="error">{error}</Alert>}
                    {successMessage && (
                        <Alert severity="success">{successMessage}</Alert>
                    )}
                </Stack>

                <Box component="form" onSubmit={handleSave} sx={{ mt: 3 }}>
                    <Stack spacing={3}>
                        <TextField
                            label="Full name"
                            value={formValues.fullName}
                            onChange={handleChange("fullName")}
                            placeholder="Add your name"
                            fullWidth
                        />
                        <TextField
                            label="Email"
                            type="email"
                            value={formValues.email}
                            onChange={handleChange("email")}
                            placeholder="Add an email address"
                            fullWidth
                        />
                        <TextField
                            label="Username"
                            value={formValues.username}
                            onChange={handleChange("username")}
                            InputProps={{ readOnly: true }}
                            helperText="Usernames are managed by the administrator"
                            fullWidth
                        />
                        <TextField
                            label="Bio"
                            value={formValues.bio}
                            onChange={handleChange("bio")}
                            placeholder="Tell us a little about yourself"
                            multiline
                            minRows={3}
                            fullWidth
                        />
                    </Stack>

                    <Box
                        sx={{
                            display: "flex",
                            gap: 2,
                            flexWrap: "wrap",
                            mt: 4,
                        }}
                    >
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={saving}
                        >
                            {saving ? "Saving..." : "Save changes"}
                        </Button>
                        <Button
                            type="button"
                            variant="outlined"
                            onClick={() =>
                                setFormValues(buildFormValues(profile || {}))
                            }
                            disabled={saving}
                        >
                            Reset
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    )
}
