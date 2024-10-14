import { Either, left, right } from "./either"

function doSomething(shouldBeTrue: boolean): Either<string, string> {
    if(shouldBeTrue){
        return right('Successs')
    } else{
        return left('Error')
    }
}

test('Success Result', () => {
    const Success = doSomething(true)

    expect(Success.isRight()).toBe(true)
    expect(Success.isLeft()).toBe(false)

})

test('Fail Result', () => {
    const Success = left(false)

    expect(Success.isLeft()).toBe(true)
    expect(Success.isRight()).toBe(false)
})