import { Injectable } from "@nestjs/common"

import { Either, right, left } from "@/core/either"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

import { Question } from "@/domain/forum/enterprise/entities/question"

import { QuestionsRepository } from "../repositories/questions-repository"
import { QuestionAttachment } from "../../enterprise/entities/question-attachment"
import { QuestionAttachmentList } from "../../enterprise/entities/question-attachment-list"

import { Student } from "../../enterprise/entities/student"

import { WrongCredentialsError } from "./errors/wrong-credentials-error"
import { StudentAlreadyExistsError } from "./errors/student-already-exists-error"
import { StudentsRepository } from "../repositories/students-repository"
import { HashGenerator } from "../cryptography/hash-generator"
import { HashComparer } from "../cryptography/hash-comparer"
import { Encrypter } from "../cryptography/encrypter"

interface RegisterStudentUseCaseRequest {
  name: string
  email: string
  password: string
}

type RegisterStudentUseCaseResponse = Either<
  StudentAlreadyExistsError,
  {
    student: Student
  }
>

@Injectable()
export class RegisterStudentUseCase {
  constructor(
    private studentsRepository: StudentsRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    email,
    password,
  }: RegisterStudentUseCaseRequest): Promise<RegisterStudentUseCaseResponse> {
    const studentWithSameEmail =
      await this.studentsRepository.findByEmail(email)

    if (studentWithSameEmail) {
      return left(new StudentAlreadyExistsError(email))
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const student = Student.create({
      name,
      email,
      password: hashedPassword,
    })

    await this.studentsRepository.create(student)

    return right({ student })
  }
}
