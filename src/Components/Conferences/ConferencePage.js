// src/components/VideoConference.js

import React, { useEffect, useState } from "react";
import Video from "twilio-video";

const VideoConference = () => {
  const [room, setRoom] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/generate-access-token"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch access token");
        }

        const data = await response.json();
        setToken(data.token);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching the access token:", error);
        setLoading(false);
      }
    };

    fetchToken();
  }, []);

  useEffect(() => {
    const connectToRoom = async () => {
      if (token) {
        try {
          console.log("Connecting to the room...");
          const newRoom = await Video.connect(token, {
            name: "your-room-name",
          });
          setRoom(newRoom);

          // Participant event listeners
          newRoom.on("participantConnected", handleParticipantConnected);
          newRoom.on("participantDisconnected", handleParticipantDisconnected);

          // Log a message when the local participant joins the room
          console.log(`Successfully joined room: ${newRoom.name}`);
        } catch (error) {
          console.error("Error connecting to the Twilio Video service:", error);
        }
      }
    };

    connectToRoom();

    // Clean up function when the component is unmounted
    return () => {
      if (room) {
        room.disconnect();
        setRoom(null);
      }
    };
  }, [token]);

  const handleParticipantConnected = (participant) => {
    console.log(`Participant ${participant.identity} connected.`);
  };

  const handleParticipantDisconnected = (participant) => {
    console.log(`Participant ${participant.identity} disconnected.`);
  };

  return (
    <div>
      <h1>Video Conference</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div id="video-container">
          {room &&
            room.localParticipant.tracks &&
            Array.isArray(room.localParticipant.tracks) &&
            room.localParticipant.tracks.map((track) => (
              <video
                key={track.trackSid}
                ref={(ref) => ref && track.attach(ref)}
              />
            ))}
          {room &&
            [...room.participants.values()].map((participant) =>
              [...participant.tracks.values()].map((track) => (
                <video
                  key={track.trackSid}
                  ref={(ref) => ref && track.attach(ref)}
                />
              ))
            )}
        </div>
      )}
    </div>
  );
};

export default VideoConference;
