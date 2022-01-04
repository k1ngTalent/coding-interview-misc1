/**
 * In our app we have regions of text that may or not be contiguous.
 *
 * The text is given back as rectangles with x, y, width, and height properties.
 *
 * If the x, y, width, and height are close enough, we can assume they're the same word.
 *
 * Sometimes our rectangles are word fragments NOT the whole word so we need to join the words
 * again to form entire sentences.
 *
 * The test data has examples of what these partial regions would look like.
 */
export namespace TextMergeJoin {

    export interface IPDFTextWord {
        readonly pageNum: number;
        readonly x: number;
        readonly y: number;
        readonly width: number;
        readonly height: number;
        readonly str: string;
    }

    /**
     *
     */
    export function doMergeWords(data: ReadonlyArray<IPDFTextWord>): ReadonlyArray<IPDFTextWord> {

        const copyData = JSON.parse(JSON.stringify(data));
             function sorter(a:any, b:any) {
                if (a.y < b.y) {
                  if (a.x < b.x) {
                    return -1;
                  } else if (a.x > b.x) {
                    return 1;
                  }
                }
                if (a.y > b.y) {
                 return -1
                }
                return 0
            }
            const returnData = copyData.sort(sorter);
            for (let i = 0; i < returnData.length; i++) {
                let result = returnData[i];
                let count = i+1;
                while (returnData[count].str[0] !== returnData[count].str[0].toUpperCase()){
                  let nextWord = returnData[count].str;
                  result.str = returnData[count].str+nextWord
                  count++
                }
                returnData[i] = result;
            }
            return returnData;
        }

}
