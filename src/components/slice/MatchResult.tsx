import type { Match } from "tba-api-client";

export default function MatchResult(props: { match: Match }) {

    const compLevel = props.match.comp_level.replace('fm', 'F').replace('qm', 'Q').toUpperCase()

    if (!props.match.alliances || !props.match.alliances.red || !props.match.alliances.blue) {
        return (
            <p>ERR</p>
        )
    }



    return (
        <div className="flex flex-row items-center px-2 gap-2 h-16 mb-1 bg-zinc-800 rounded-lg">
            <div className="h-auto text-center min-w-8 leading-none">
                <span className="text-xs text-muted-foreground">{compLevel}</span>
                <br />
                <span>{((compLevel === "QF" || compLevel === "SF") ? `${props.match.set_number}.` : '') + props.match.match_number}</span>
                {/* {props.match.set_number} */}
            </div>

            <AlliancesGrid alliances={props.match.alliances} />
            <MatchScores match={props.match} />
        </div>
    )

}

function AlliancesGrid(props: { alliances: NonNullable<Match["alliances"]> }) {

    const redTeams = props.alliances.red!.team_keys;
    const redDq = props.alliances.red!.dq_team_keys;

    const blueTeams = props.alliances.blue!.team_keys;
    const blueDq = props.alliances.blue!.dq_team_keys;

    return (
        <div className="flex-grow grid grid-cols-3 w-48 text-center rounded-lg overflow-hidden h-full">
            {redTeams.map((team) => {
                return (
                    <div key={team} className={"font-semibold flex items-center justify-center bg-rose-500 " + (redDq?.includes(team) ? 'line-through' : '')}>
                        {team.slice(3)}
                    </div>
                )
            })}

            {blueTeams.map((team) => {
                return (
                    <div key={team} className={"font-semibold flex items-center justify-center bg-sky-400 " + (blueDq?.includes(team) ? 'line-through' : '')}>
                        {team.slice(3)}
                    </div>
                )
            })}
        </div>
    )

}

function MatchScores(props: { match: Match }) {
    const redScore = props.match.alliances!.red!.score;
    const blueScore = props.match.alliances!.blue!.score;

    return (
        <div className="min-w-8 text-center leading-loose">
            <span className={(redScore > blueScore) ? 'font-bold' : ''}>{redScore}</span>
            <br />
            <span className={(blueScore > redScore) ? 'font-bold' : ''}>{blueScore}</span>
        </div>
    )
}