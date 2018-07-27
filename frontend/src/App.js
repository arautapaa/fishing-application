import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import AddEntry from './components/add/AddEntry';

class App extends Component {
  render() {
    const SELECTIONS = {
        "fish": [
            {
                "type": "fish",
                "name": "Ahven",
                "additionalAttributes": {
                    "weight": {
                        "range": {
                            "max": 3,
                            "steps": 50,
                            "min": 0
                        },
                        "default": 300
                    },
                    "gear": {
                        "default": "Virveli"
                    }
                }
            },
            {
                "type": "fish",
                "name": "Hauki",
                "additionalAttributes": {
                    "weight": {
                        "range": {
                            "max": 15,
                            "steps": 50,
                            "min": 0
                        },
                        "default": 1200
                    },
                    "gear": {
                        "default": "Virveli"
                    }
                }
            },
            {
                "type": "fish",
                "name": "Kuha",
                "additionalAttributes": {
                    "weight": {
                        "range": {
                            "max": 12,
                            "steps": 50,
                            "min": 0
                        },
                        "default": 800
                    },
                    "gear": {
                        "default": "Verkko"
                    }
                }
            },
            {
                "type": "fish",
                "name": "Lahna",
                "additionalAttributes": {
                    "weight": {
                        "range": {
                            "max": 8,
                            "steps": 50,
                            "min": 0
                        },
                        "default": 700
                    },
                    "gear": {
                        "default": "Verkko"
                    }
                }
            },
            {
                "type": "fish",
                "name": "Lohi",
                "additionalAttributes": {
                    "weight": {
                        "range": {
                            "max": 10,
                            "steps": 50,
                            "min": 0
                        },
                        "default": 1500
                    },
                    "gear": {
                        "default": "Verkko"
                    }
                }
            },
            {
                "type": "fish",
                "name": "Säyne",
                "additionalAttributes": {
                    "weight": {
                        "range": {
                            "max": 6,
                            "steps": 50,
                            "min": 0
                        },
                        "default": 700
                    },
                    "gear": {
                        "default": "Verkko"
                    }
                }
            },
            {
                "type": "fish",
                "name": "Taimen",
                "additionalAttributes": {
                    "weight": {
                        "range": {
                            "max": 10,
                            "steps": 50,
                            "min": 0
                        },
                        "default": 1500
                    },
                    "gear": {
                        "default": "Verkko"
                    }
                }
            }
        ],
        "fisher": [
            {
                "type": "fisher",
                "name": "Antti",
                "additionalAttributes": []
            },
            {
                "type": "fisher",
                "name": "Ilkka",
                "additionalAttributes": []
            }
        ],
        "gear": [
            {
                "type": "gear",
                "name": "Verkko",
                "additionalAttributes": []
            },
            {
                "type": "gear",
                "name": "Virveli",
                "additionalAttributes": []
            }
        ]
    };

    const PLACES = [
        {
            "id": "69061915-9ebe-4e30-a48d-9c06feb1d7f3",
            "name": "Oma ranta",
            "latitude": 62.0955015,
            "longitude": 28.3181897,
            "location": "Rantasalmi"
        },
        {
            "id": "6aca72f7-24a5-4e69-ad6f-70898207dca3",
            "name": "Linnasaari",
            "latitude": 62.1110595,
            "longitude": 28.502917,
            "location": "Savonlinna"
        },
        {
            "id": "91dc7fd6-5379-4b1b-a365-987f80785c87",
            "name": "Mustikkasaari",
            "latitude": 62.0884446,
            "longitude": 28.4846352,
            "location": "Rantasalmi"
        },
        {
            "id": "baa670ed-010e-453d-9aa1-a96fa902759b",
            "name": "Piiskari",
            "latitude": 62.101903,
            "longitude": 28.3156472,
            "location": "Rantasalmi"
        }
    ];

    return (
      <div className="application">
        <AddEntry selections={SELECTIONS} places={PLACES}/>
      </div>
    );
  }
}

export default App;
