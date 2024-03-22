import React from 'react';

export const TeamContext = React.createContext<{
    teamNameExists: boolean;
    setTeamNameExists: (_teamNameExists: boolean, _teamName: string) => void;
}>({
    teamNameExists: false,
    setTeamNameExists: () => {},
});