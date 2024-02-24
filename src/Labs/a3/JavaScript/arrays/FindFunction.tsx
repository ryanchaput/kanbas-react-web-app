function FindFunction() {
    let numberArray1 = [1, 2, 3, 4, 5];
    let stringArray1 = ['string1', 'string2', 'string3'];

    const fourIndex = numberArray1.findIndex((a: number) => a === 4);
    const string3Index = stringArray1.findIndex((a: string) => a === 'string3');

    return (
        <div>
            <h2>Find</h2>
            fourIndex = {fourIndex}<br />
            string3Index = {string3Index}
        </div>
    );
}
export default FindFunction;