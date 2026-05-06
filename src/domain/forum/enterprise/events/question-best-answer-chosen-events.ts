import { DomainEvent } from "@/core/events/domain-event";
import { Question } from "../entities/question";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

export class QuestionBestAnswerChosenEvent implements DomainEvent {
  public occurredAt: Date;
  public question: Question;
  public bestAnswerId: UniqueEntityID;

  constructor(question: Question, bestAnswerId: UniqueEntityID) {
    this.question = question;
    this.occurredAt = new Date();
    this.bestAnswerId = bestAnswerId;
  }

  public getAggregateId() {
    return this.question.id;
  }
}
