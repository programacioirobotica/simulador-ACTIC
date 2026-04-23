import type { Question } from "../data/questions";
import type { UserAnswer } from "../types/exam";
import { HotspotQuestion } from "./questions/HotspotQuestion";
import { MatchingQuestion } from "./questions/MatchingQuestion";
import { MultipleChoiceQuestion } from "./questions/MultipleChoiceQuestion";
import { OrderingQuestion } from "./questions/OrderingQuestion";
import { ScenarioQuestion } from "./questions/ScenarioQuestion";
import { SingleChoiceQuestion } from "./questions/SingleChoiceQuestion";
import { UIClickQuestion } from "./questions/UIClickQuestion";

type Props = {
  question: Question;
  answer: UserAnswer;
  onChange: (value: UserAnswer) => void;
};

export function QuestionRenderer({ question, answer, onChange }: Props): JSX.Element {
  switch (question.tipus) {
    case "single":
      return <SingleChoiceQuestion question={question} answer={answer} onChange={onChange} />;
    case "multiple":
      return <MultipleChoiceQuestion question={question} answer={answer} onChange={onChange} />;
    case "ordering":
      return <OrderingQuestion question={question} answer={answer} onChange={onChange} />;
    case "matching":
      return <MatchingQuestion question={question} answer={answer} onChange={onChange} />;
    case "scenario":
      return <ScenarioQuestion question={question} answer={answer} onChange={onChange} />;
    case "hotspot":
      return <HotspotQuestion question={question} answer={answer} onChange={onChange} />;
    case "ui-click":
      return <UIClickQuestion question={question} answer={answer} onChange={onChange} />;
    default:
      return <div>No compatible</div>;
  }
}

