import { Box, IconButton, Tooltip, Snackbar, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Typography, Stack, Paper } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import RedditIcon from "@mui/icons-material/Reddit";
import LinkIcon from "@mui/icons-material/Link";
import ShareIcon from "@mui/icons-material/Share";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TelegramIcon from "@mui/icons-material/Telegram";
import EmailIcon from "@mui/icons-material/Email";
import { useState } from "react";

interface EnhancedSocialShareProps {
  url: string;
  title: string;
  description?: string;
  tags?: string[];
}

export default function EnhancedSocialShare({ url, title, description = "", tags = [] }: EnhancedSocialShareProps) {
  // Ensure we have absolute URLs for sharing
  const absoluteUrl = url.startsWith("http") ? url : `${typeof window !== "undefined" ? window.location.origin : ""}${url}`;
  
  // Encode parameters for sharing
  const encodedUrl = encodeURIComponent(absoluteUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description || `Check out this post: ${title}`);
  
  // Format tags as hashtags for social media
  const hashTags = tags.map(tag => `#${tag.replace(/\s+/g, '')}`).join(' ');

  // Custom share dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [customMessage, setCustomMessage] = useState(`${title} ${hashTags}`);
  const [selectedPlatform, setSelectedPlatform] = useState('');

  // Snackbar state for copy feedback
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("Link copied to clipboard!");
  const handleSnackClose = () => setSnackOpen(false);
  
  // Check if Web Share API is available
  const canShare = typeof navigator !== 'undefined' && navigator.share;

  // Native share function
  const handleNativeShare = async () => {
    if (canShare) {
      try {
        await navigator.share({
          title: title,
          text: description || `Check out this post: ${title}`,
          url: absoluteUrl,
        });
      } catch (err) {
        console.log('Share cancelled or failed:', err);
      }
    }
  };

  // Share URLs for different platforms - only keeping linkedInUrl as it's used directly
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  // Note: encodedDescription and other encoded variables are used in handleCustomShare
  
  // Function to copy content to clipboard
  const copyToClipboard = (content: string, message: string = "Link copied to clipboard!") => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(content).then(
        () => {
          setSnackMessage(message);
          setSnackOpen(true);
        },
        (err) => {
          console.error("Could not copy text: ", err);
        }
      );
    }
  };

  // Handle custom share dialog
  const openShareDialog = (platform: string) => {
    setSelectedPlatform(platform);
    setDialogOpen(true);
  };

  const handleCustomShare = () => {
    setDialogOpen(false);
    
    let shareUrl = '';
    switch (selectedPlatform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodeURIComponent(customMessage)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodeURIComponent(customMessage)}`;
        break;
      case 'reddit':
        shareUrl = `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodeURIComponent(customMessage)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${customMessage} ${absoluteUrl}`)}`;
        break;
      case 'telegram':
        shareUrl = `https://t.me/share/url?url=${encodedUrl}&text=${encodeURIComponent(customMessage)}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${encodedTitle}&body=${encodeURIComponent(`${customMessage}\n\n${absoluteUrl}`)}`;
        break;
      default:
        return;
    }
    
    if (typeof window !== 'undefined') {
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }
  };

  // Function to copy formatted share text with URL
  const copyShareText = () => {
    const textToCopy = `${customMessage}\n\n${absoluteUrl}`;
    copyToClipboard(textToCopy, "Share text copied to clipboard!");
  };

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {/* Primary Share Options */}
        {/* <Paper elevation={1} sx={{ p: 2, borderRadius: 2 }}>
          <Typography variant="subtitle1" gutterBottom fontWeight="medium">
            Share this post
          </Typography>
          
          <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1 }}>
            Native Share Button (if supported)
            {canShare && (
              <Button
                variant="contained"
                startIcon={<ShareIcon />}
                onClick={handleNativeShare}
                size="small"
              >
                Share
              </Button>
            )}
            
            Custom Share with Text Button
            <Button 
              variant="outlined" 
              startIcon={<ShareIcon />}
              onClick={() => openShareDialog('custom')}
              size="small"
            >
              Custom Share
            </Button>
            
            Copy Share Text Button
            <Button
              variant="outlined"
              startIcon={<ContentCopyIcon />}
              onClick={copyShareText}
              size="small"
            >
              Copy Text + Link
            </Button>
          </Stack>
        </Paper> */}
        
        {/* Social Media Icons */}
        <Paper elevation={1} sx={{ p: 2, borderRadius: 2 }}>
          <Typography variant="subtitle2" gutterBottom color="text.secondary">
            Share on social media
          </Typography>
          
          <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1 }}>
            {/* <Tooltip title="Share on Twitter with custom text">
              <IconButton
                onClick={() => openShareDialog('twitter')}
                aria-label="Share on Twitter"
                size="small"
                sx={{ color: "#1DA1F2" }}
              >
                <TwitterIcon />
              </IconButton>
            </Tooltip> */}
            
            <Tooltip title="Share on Facebook">
              <IconButton
                onClick={() => openShareDialog('facebook')}
                aria-label="Share on Facebook"
                size="small"
                sx={{ color: "#4267B2" }}
              >
                <FacebookIcon />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Share on LinkedIn">
              <IconButton
                component="a"
                href={linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on LinkedIn"
                size="small"
                sx={{ color: "#0077B5" }}
              >
                <LinkedInIcon />
              </IconButton>
            </Tooltip>
            
            {/* <Tooltip title="Share on Reddit with custom title">
              <IconButton
                onClick={() => openShareDialog('reddit')}
                aria-label="Share on Reddit"
                size="small"
                sx={{ color: "#FF4500" }}
              >
                <RedditIcon />
              </IconButton>
            </Tooltip> */}
            
            {/* <Tooltip title="Share on WhatsApp">
              <IconButton
                onClick={() => openShareDialog('whatsapp')}
                aria-label="Share on WhatsApp"
                size="small"
                sx={{ color: "#25D366" }}
              >
                <WhatsAppIcon />
              </IconButton>
            </Tooltip> */}
            
            {/* <Tooltip title="Share on Telegram">
              <IconButton
                onClick={() => openShareDialog('telegram')}
                aria-label="Share on Telegram"
                size="small"
                sx={{ color: "#0088cc" }}
              >
                <TelegramIcon />
              </IconButton>
            </Tooltip> */}
            
            {/* <Tooltip title="Share via Email">
              <IconButton
                onClick={() => openShareDialog('email')}
                aria-label="Share via Email"
                size="small"
              >
                <EmailIcon />
              </IconButton>
            </Tooltip> */}
            
            <Tooltip title="Copy link">
              <IconButton
                onClick={() => copyToClipboard(absoluteUrl)}
                aria-label="Copy link"
                size="small"
              >
                <LinkIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </Paper>
      </Box>
      
      {/* Custom Share Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedPlatform === 'custom' ? 'Share with custom text' : `Share on ${selectedPlatform.charAt(0).toUpperCase() + selectedPlatform.slice(1)}`}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              label="Your message"
              multiline
              rows={4}
              fullWidth
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              variant="outlined"
              helperText={`The link will be automatically added ${selectedPlatform === 'email' ? 'to the email body' : 'to your share'}`}
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="caption" color="text.secondary">
              {selectedPlatform === 'facebook' && "Note: Facebook may ignore custom text due to their sharing policies."}
              {selectedPlatform === 'linkedin' && "Note: LinkedIn doesn't support custom text in their sharing API."}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleCustomShare} variant="contained">
            Share
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Feedback Snackbar */}
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={snackOpen}
        autoHideDuration={3000}
        onClose={handleSnackClose}
        message={snackMessage}
      />
    </>
  );
}
