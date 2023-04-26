class Point
{
    x;
    y;
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }

    isEqual(otherPoint)
    {
        if (this.x == otherPoint.x && this.x == otherPoint.y) return true;
        return false;
    }
}