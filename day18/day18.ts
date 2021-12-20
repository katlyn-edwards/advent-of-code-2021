namespace day18 {
    const input = `[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]
    [[[5,[2,8]],4],[5,[[9,9],0]]]
    [6,[[[6,2],[5,6]],[[7,6],[4,7]]]]
    [[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]
    [[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]
    [[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]
    [[[[5,4],[7,7]],8],[[8,3],8]]
    [[9,3],[[9,9],[6,[4,9]]]]
    [[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]
    [[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]`;

    interface Node {
        left: Node;
        right: Node;
        parent: Node;
        value: number;
    }

    function printTree(node: Node) {
        if (!node) {
            return '';
        }
        if (isLeaf(node)) {
            return node.value + '';
        }
        return `[${printTree(node.left)},${printTree(node.right)}]`;
    }

    function add(left: Node, right: Node): Node {
        let newParent = {
            left,
            right,
            parent: undefined,
            value: undefined,
        };
        left.parent = newParent;
        right.parent = newParent;
        return newParent;
    }

    function reduce(root: Node) {
        let performedAction  = true;
        // repeatedly do actions in order until nothing applies
        while (performedAction) {
            // If any pair is nested inside four pairs, the leftmost 
            // such pair explodes.
            let nodeToExplode = getDepthFourNode(root, 0);
            if (nodeToExplode) {
                explode(nodeToExplode);
                continue;
            }

            // If any regular number is 10 or greater, 
            // the leftmost such regular number splits.
            let nodeToSplit = getTenOrLarger(root);
            if (nodeToSplit) {
                split(nodeToSplit);
            } else {
                performedAction = false;
            }
        }
    }

    function getDepthFourNode(curr: Node, depth: number): Node|undefined {
        if (depth > 4) {
            return curr.parent;
        }
        if (isLeaf(curr)) {
            return undefined;
        }

        let foundLeft = getDepthFourNode(curr.left, depth + 1);
        let foundRight = getDepthFourNode(curr.right, depth + 1);
        return foundLeft || foundRight;
    }

    function getTenOrLarger(curr: Node): Node|undefined {
        if (isLeaf(curr)) {
            if (curr.value >= 10) {
                return curr;
            }
            return undefined;
        }
        let left = getTenOrLarger(curr.left);
        if (left) {
            return left;
        }
        let right = getTenOrLarger(curr.right);
        return right;
    }

    function parse(input: string): Node {
        let stack: Array<Node> = [];
        let root = {} as Node;
        let filtered = input.split('').filter(el => el != ',' && el != ' ');
        while (filtered.length) {
            let token = filtered.shift();
            let parent = stack.length ? stack[stack.length - 1] : undefined;
            if (token == '[') {
                let node = {
                    left: undefined,
                    right: undefined,
                    parent: parent,
                    value: undefined,
                };
                if (parent) {
                    if (!parent.left) {
                        parent.left = node;
                    } else if (!parent.right) {
                        parent.right = node;
                    } else {
                        console.log("error assinging child to parent");
                    }
                }

                stack.push(node);
            } else if (token == ']') {
                // done with node
                const node = stack.pop();
                if (!filtered.length) {
                    // this is the root
                    root = node;
                }
            } else {
                // numerical kiddo
                // if no left yet, set it
                if (!parent.left) {
                    parent.left = {
                        value: Number(token),
                        parent,
                    } as Node;
            } else if (!parent.right) {
                    parent.right = {
                        value: Number(token),
                        parent,
                    } as Node;
            } else {
                    console.log('error: both children are set?');
                    return;
                }
            }
        }
        return root;
    }

    function isLeaf(node: Node) {
        return !node.left && !node.right;
    }

    function split(node: Node) {
        let left = Math.floor(node.value / 2);
        let right = Math.ceil(node.value / 2);
        node.value = 0;
        node.left = {
            left: undefined,
            right: undefined,
            parent: node,
            value: left,
        };
        node.right = {
            left: undefined,
            right: undefined,
            parent: node,
            value: right,
        };
    }

    function explode(node: Node) {
        let currLeft = node.left.value;
        let currRight = node.right.value;
        node.value = 0;

        let leftSib = findLeftSibling(node.left);
        let rightSib = findRightSibling(node.right);

        if (leftSib) {
            leftSib.value += currLeft;
        }
        if (rightSib) {
            rightSib.value += currRight;
        }
        node.left = undefined;
        node.right = undefined;
    }

    function findLeftSibling(node: Node): Node|undefined {
        let curr = node;
        let parent = curr.parent;
        let wasLeft = node == parent.left;
        let sibling: Node|undefined;
        if (wasLeft) {
            // go up until there is a left node
            let cp = parent;
            let c = parent.parent;
            while (!!c && c.left == cp) {
                cp = c;
                c = c.parent;
            }
            if (!!c) {
                sibling = exploreRightToLeaf(c.left);
            }
        } else {
            // explore right side of left node
            sibling = exploreRightToLeaf(parent.left);
        }
        return sibling;
    }

    function exploreLeftToLeaf(node: Node): Node {
        let curr = node;
        while (curr && !isLeaf(curr)) {
            curr = curr.left;
        }
        return curr;
    }

    function exploreRightToLeaf(node: Node): Node {
        let curr = node;
        while (curr && !isLeaf(curr)) {
            curr = curr.right;
        }
        return curr;
    }

    function findRightSibling(node: Node): Node|undefined {
        let curr = node;
        let parent = curr.parent;
        let wasRight = curr == parent.right;
        let sibling: Node|undefined;
        if (wasRight) {
            // go up until there is a right node
            let cp = parent;
            let c = parent.parent;
            while (!!c && c.right == cp) {
                cp = c;
                c = c.parent;
            }
            if (!!c) {
                sibling = exploreLeftToLeaf(c.right);
            }
        } else {
            // explore left side of right node
            sibling = exploreLeftToLeaf(parent.right);
        }
        return sibling;
    }

    function findMagnitude(node: Node): number {
        if (!node) {
            return 0;
        }
        if (isLeaf(node)) {
            return node.value;
        }
        return (3 * findMagnitude(node.left)) +
               (2 * findMagnitude(node.right));

    }

    function partOne() {
        let lines = input.split('\n').map(el => el.trim());
        let left = parse(lines.shift());
        while (lines.length) {
            let right = parse(lines.shift());
            left = add(left, right);
            reduce(left);
        }
        console.log(printTree(left));
        console.log(`Part one: ${findMagnitude(left)}`);
    }
    partOne();

    function partTwo() {
        let results = [];
        let lines = input.split('\n').map(el => el.trim());
        for (let i = 0; i < lines.length; i++) {
            for (let j = 0; j < lines.length; j++) {
                if (i == j) {
                    continue;
                }
                let left = parse(lines[i]);
                let right = parse(lines[j]);
                let newRoot = add(left, right);
                reduce(newRoot);
                let total = findMagnitude(newRoot);
                results.push(total);
            }
        }
        let biggest = results.reduce((prev, curr) => curr > prev ? curr : prev, 0)
        console.log(`Part two: ${biggest}`);
    }
    partTwo();
}