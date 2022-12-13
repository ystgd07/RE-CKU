import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class EmailAuth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  code: number;

  @Column({ default: false })
  verify: boolean;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  time: Date;
}
// 처리
// email 발송과 동시에 DB 저장
// db에는 email로 발송한 랜덤번호와, email을 저장함
// if db저장시간+240000  - Date.now() >0  =>  인증완료
// 인증완료가 된다면 ?

// 재발송한다면 ?
// 이 프라이머리를 찾아서 created 를 Date.now+240000으로 바꾸면 됨
