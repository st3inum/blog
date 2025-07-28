import { Box, IconButton, Tooltip, Snackbar, Button } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import RedditIcon from "@mui/icons-material/Reddit";
import LinkIcon from "@mui/icons-material/Link";
import ShareIcon from "@mui/icons-material/Share";
import { useState } from "react";

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
}

export default function SocialShare({ url, title, description = "" }: SocialShareProps) {
  // Ensure we have absolute URLs for sharing
  const absoluteUrl = url.startsWith("http") ? url : `${typeof window !== "undefined" ? window.location.origin : ""}${url}`;
  
  // Encode parameters for sharing
  const encodedUrl = encodeURIComponent(absoluteUrl);
  const encodedTitle = encodeURIComponent(title);



  // Snackbar state for copy feedback
  const [snackOpen, setSnackOpen] = useState(false);
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

  // Share URLs for different platforms
  const twitterUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodeURIComponent(`${title} ${absoluteUrl}`)}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  const redditUrl = `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`;
  
  // Function to copy the current URL to clipboard
  const copyToClipboard = () => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(absoluteUrl).then(
        () => {
          setSnackOpen(true);
        },
        (err) => {
          console.error("Could not copy text: ", err);
        }
      );
    }
  };
  
  return (
    <>
      <Box sx={{ display: "flex", gap: 1, alignItems: "center", flexWrap: "wrap" }}>
        {/* Native Share Button (if supported) */}
        {canShare && (
          <Button
            variant="contained"
            startIcon={<ShareIcon />}
            onClick={handleNativeShare}
            sx={{ mr: 2, mb: { xs: 1, sm: 0 } }}
          >
            Share
          </Button>
        )}
      <Tooltip title="Share on Twitter">
        <IconButton
          component="a"
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Twitter"
          size="small"
          sx={{ color: "#1DA1F2" }}
        >
          <TwitterIcon />
        </IconButton>
      </Tooltip>
      
      <Tooltip title="Share on Facebook">
        <IconButton
          component="a"
          href={facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
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
      
      <Tooltip title="Share on Reddit">
        <IconButton
          component="a"
          href={redditUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Reddit"
          size="small"
          sx={{ color: "#FF4500" }}
        >
          <RedditIcon />
        </IconButton>
      </Tooltip>
      
      <Tooltip title="Copy link">
        <IconButton
          onClick={copyToClipboard}
          aria-label="Copy link"
          size="small"
        >
          <LinkIcon />
        </IconButton>
      </Tooltip>
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={snackOpen}
        autoHideDuration={3000}
        onClose={handleSnackClose}
        message="Link copied to clipboard!"
      />
    </>
  );
 }
