"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [tracks, setTracks] = useState([]);

    useEffect(() => {
        fetch("/api/tracks")
              .then((res) => res.json())
                    .then((data) => {
                            console.log("Tracks recebidas:", data);
                                    setTracks(data);
                                          });
                                            }, []);

                                              return (
                                                  <div style={{ padding: "40px", fontFamily: "Arial" }}>
                                                        <h1>Lista de Tracks</h1>

                                                              <ul>
                                                                      {tracks.map((track: any) => (
                                                                                <li key={track.id}>
                                                                                            {track.id} - {track.name}
                                                                                                      </li>
                                                                                                              ))}
                                                                                                                    </ul>
                                                                                                                        </div>
                                                                                                                          );
                                                                                                                          }