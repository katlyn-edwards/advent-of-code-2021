var day18;
(function (day18) {
    var input = "[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]\n    [[[5,[2,8]],4],[5,[[9,9],0]]]\n    [6,[[[6,2],[5,6]],[[7,6],[4,7]]]]\n    [[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]\n    [[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]\n    [[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]\n    [[[[5,4],[7,7]],8],[[8,3],8]]\n    [[9,3],[[9,9],[6,[4,9]]]]\n    [[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]\n    [[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]";
    function printTree(node) {
        if (!node) {
            return '';
        }
        if (isLeaf(node)) {
            return node.value + '';
        }
        return "[".concat(printTree(node.left), ",").concat(printTree(node.right), "]");
    }
    function add(left, right) {
        var newParent = {
            left: left,
            right: right,
            parent: undefined,
            value: undefined,
        };
        left.parent = newParent;
        right.parent = newParent;
        return newParent;
    }
    function reduce(root) {
        var performedAction = true;
        // repeatedly do actions in order until nothing applies
        while (performedAction) {
            // If any pair is nested inside four pairs, the leftmost 
            // such pair explodes.
            var nodeToExplode = getDepthFourNode(root, 0);
            if (nodeToExplode) {
                explode(nodeToExplode);
                continue;
            }
            // If any regular number is 10 or greater, 
            // the leftmost such regular number splits.
            var nodeToSplit = getTenOrLarger(root);
            if (nodeToSplit) {
                split(nodeToSplit);
            }
            else {
                performedAction = false;
            }
        }
    }
    function getDepthFourNode(curr, depth) {
        if (depth > 4) {
            return curr.parent;
        }
        if (isLeaf(curr)) {
            return undefined;
        }
        var foundLeft = getDepthFourNode(curr.left, depth + 1);
        var foundRight = getDepthFourNode(curr.right, depth + 1);
        return foundLeft || foundRight;
    }
    function getTenOrLarger(curr) {
        if (isLeaf(curr)) {
            if (curr.value >= 10) {
                return curr;
            }
            return undefined;
        }
        var left = getTenOrLarger(curr.left);
        if (left) {
            return left;
        }
        var right = getTenOrLarger(curr.right);
        return right;
    }
    function parse(input) {
        var stack = [];
        var root = {};
        var filtered = input.split('').filter(function (el) { return el != ',' && el != ' '; });
        while (filtered.length) {
            var token = filtered.shift();
            var parent_1 = stack.length ? stack[stack.length - 1] : undefined;
            if (token == '[') {
                var node = {
                    left: undefined,
                    right: undefined,
                    parent: parent_1,
                    value: undefined,
                };
                if (parent_1) {
                    if (!parent_1.left) {
                        parent_1.left = node;
                    }
                    else if (!parent_1.right) {
                        parent_1.right = node;
                    }
                    else {
                        console.log("error assinging child to parent");
                    }
                }
                stack.push(node);
            }
            else if (token == ']') {
                // done with node
                var node = stack.pop();
                if (!filtered.length) {
                    // this is the root
                    root = node;
                }
            }
            else {
                // numerical kiddo
                // if no left yet, set it
                if (!parent_1.left) {
                    parent_1.left = {
                        value: Number(token),
                        parent: parent_1,
                    };
                }
                else if (!parent_1.right) {
                    parent_1.right = {
                        value: Number(token),
                        parent: parent_1,
                    };
                }
                else {
                    console.log('error: both children are set?');
                    return;
                }
            }
        }
        return root;
    }
    function isLeaf(node) {
        return !node.left && !node.right;
    }
    function split(node) {
        var left = Math.floor(node.value / 2);
        var right = Math.ceil(node.value / 2);
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
    function explode(node) {
        var currLeft = node.left.value;
        var currRight = node.right.value;
        node.value = 0;
        var leftSib = findLeftSibling(node.left);
        var rightSib = findRightSibling(node.right);
        if (leftSib) {
            leftSib.value += currLeft;
        }
        if (rightSib) {
            rightSib.value += currRight;
        }
        node.left = undefined;
        node.right = undefined;
    }
    function findLeftSibling(node) {
        var curr = node;
        var parent = curr.parent;
        var wasLeft = node == parent.left;
        var sibling;
        if (wasLeft) {
            // go up until there is a left node
            var cp = parent;
            var c = parent.parent;
            while (!!c && c.left == cp) {
                cp = c;
                c = c.parent;
            }
            if (!!c) {
                sibling = exploreRightToLeaf(c.left);
            }
        }
        else {
            // explore right side of left node
            sibling = exploreRightToLeaf(parent.left);
        }
        return sibling;
    }
    function exploreLeftToLeaf(node) {
        var curr = node;
        while (curr && !isLeaf(curr)) {
            curr = curr.left;
        }
        return curr;
    }
    function exploreRightToLeaf(node) {
        var curr = node;
        while (curr && !isLeaf(curr)) {
            curr = curr.right;
        }
        return curr;
    }
    function findRightSibling(node) {
        var curr = node;
        var parent = curr.parent;
        var wasRight = curr == parent.right;
        var sibling;
        if (wasRight) {
            // go up until there is a right node
            var cp = parent;
            var c = parent.parent;
            while (!!c && c.right == cp) {
                cp = c;
                c = c.parent;
            }
            if (!!c) {
                sibling = exploreLeftToLeaf(c.right);
            }
        }
        else {
            // explore left side of right node
            sibling = exploreLeftToLeaf(parent.right);
        }
        return sibling;
    }
    function findMagnitude(node) {
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
        var lines = input.split('\n').map(function (el) { return el.trim(); });
        var left = parse(lines.shift());
        while (lines.length) {
            var right = parse(lines.shift());
            left = add(left, right);
            reduce(left);
        }
        console.log(printTree(left));
        console.log("Part one: ".concat(findMagnitude(left)));
    }
    partOne();
    function partTwo() {
        var results = [];
        var lines = input.split('\n').map(function (el) { return el.trim(); });
        for (var i = 0; i < lines.length; i++) {
            for (var j = 0; j < lines.length; j++) {
                if (i == j) {
                    continue;
                }
                var left = parse(lines[i]);
                var right = parse(lines[j]);
                var newRoot = add(left, right);
                reduce(newRoot);
                var total = findMagnitude(newRoot);
                results.push(total);
            }
        }
        var biggest = results.reduce(function (prev, curr) { return curr > prev ? curr : prev; }, 0);
        console.log("Part two: ".concat(biggest));
    }
    partTwo();
})(day18 || (day18 = {}));
//# sourceMappingURL=day18.js.map