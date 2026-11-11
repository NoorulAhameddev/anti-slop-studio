import json
from youtube_transcript_api import YouTubeTranscriptApi
import sys
import urllib.request
import re

def get_transcript(video_id):
    try:
        api = YouTubeTranscriptApi()
        transcript = api.fetch(video_id, languages=['en', 'pt'])
        full_text = " ".join([entry.text for entry in transcript])
        return full_text
    except Exception as e:
        # Fallback to finding by language list explicitly just in case
        try:
            transcript = api.list(video_id).find_transcript(['en', 'pt']).fetch()
            full_text = " ".join([entry.text for entry in transcript])
            return full_text
        except Exception as e2:
            return f"Error: {e2}"

def get_video_title(video_id):
    url = f"https://www.youtube.com/watch?v={video_id}"
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        html = urllib.request.urlopen(req).read().decode('utf-8')
        match = re.search(r'<title>(.*?)</title>', html)
        if match:
            title = match.group(1).replace(' - YouTube', '').strip()
            return re.sub(r'[\\\\/*?:"<>|]', '', title)
    except Exception:
        pass
    return video_id

video_ids = [
    "7FU98O0JLHs",
    "zKBUBVtoM0g",
    "uPIIJDmq5OU",
    "M4DNgmI7MIM",
    "NNv80mMzFDs",
    "T1VOVArT9YI",
    "1PXFAFMgdns",
    "UR09nuSxGio"
]

results = {}
for vid in video_ids:
    print(f"Fetching transcript for {vid}...")
    text = get_transcript(vid)
    title = get_video_title(vid)
    results[vid] = text
    
    filename = f"{title}.txt"
    print(f"Saving to {filename}...")
    with open(filename, "w", encoding="utf-8") as f:
        f.write(text)

print("Done.")
