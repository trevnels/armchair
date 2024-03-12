import type { Match } from "tba-api-client";
import { Card } from "../ui/card";

export default function MatchResult({ match, doubleElim }: { match: Match, doubleElim: boolean }) {

    function renderCompLevel() {
        switch (match.comp_level) {
            case "qm":
                return "Q";
            case "qf":
                return "QF";
            case "sf":
                return doubleElim ? "M" : "SF";
            case "f":
                return "F";
            default:
                return match.comp_level.toUpperCase();
        }
    }

    function renderMatchNumber() {
        if (match.comp_level === "qm" || match.comp_level === "f") {
            return match.match_number
        } else if (match.comp_level === "sf" && doubleElim) {
            return match.set_number
        } else {
            return match.set_number + "." + match.match_number
        }
    }

    const compLevel = renderCompLevel();

    if (!match.alliances || !match.alliances.red || !match.alliances.blue) {
        return (
            <p>ERR</p>
        )
    }

    return (
        <Card className="flex flex-row items-center px-2 h-14 mb-1 gap-2">
            <div className="h-auto min-w-8 leading-none">
                <span className="text-xs text-muted-foreground">{compLevel}</span>
                <br />
                <span>{renderMatchNumber()}</span>
            </div>

            <AlliancesGrid alliances={match.alliances} />
            <MatchScores match={match} />
        </Card>


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
                    <div key={team} className={"font-semibold flex items-center justify-center text-rose-400 " + (redDq?.includes(team) ? 'line-through' : '')}>
                        {team.slice(3)}
                    </div>
                )
            })}

            {blueTeams.map((team) => {
                return (
                    <div key={team} className={"font-semibold flex items-center justify-center text-sky-300 " + (blueDq?.includes(team) ? 'line-through' : '')}>
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

    const winner = props.match.winning_alliance;

    return (
        <div className="min-w-8 text-center leading-relaxed">
            <span className={(winner === 'red') ? 'font-bold' : ''}>{redScore}</span>
            <br />
            <span className={(winner === 'blue') ? 'font-bold' : ''}>{blueScore}</span>
        </div>
    )
}