import { Entity, Column, Index, BeforeInsert } from 'typeorm';
import Model from './model.entity';
import bcrypt from 'bcryptjs';

export enum RoleEnumType {
    USER = 'user',
    ADMIN = 'admin',
}

@Entity('users')
export class User extends Model {
    @Column()
    name: string;

    @Index('email_index')
    @Column({
        unique: true,
    })
    email: string;

    @Column()
    password: string;

    @Column({
        type: 'enum',
        enum: RoleEnumType,
        default: RoleEnumType.USER,
    })
    role: RoleEnumType.USER;

    @Column({
        default: 'default.png',
    })
    photo: string;

    @Column({
        default: false,
    })
    verified: boolean;
    @Column({
        default: 0,
        nullable: true
    })
    ballance: number;
    // ? Hash password before saving to database
    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 12);
    }

    // ? Validate password
    static async comparePasswords(
        candidatePassword: string,
        hashedPassword: string
    ) {
        return await bcrypt.compare(candidatePassword, hashedPassword);
    }
    toJSON() {
        return { ...this, password: undefined, verified: undefined };
    }

}

