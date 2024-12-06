namespace TutorialDemo.ViewModels;

public class TutorialViewModel
{
    public List<s_TutorialImages> TutorialImages { get; set; } = new List<s_TutorialImages>
    {
        new s_TutorialImages { TutorialImageID = 1, PointerType = "PointUp", ImageFileName = "Up.png" },
        new s_TutorialImages { TutorialImageID = 2, PointerType = "PointTopRight", ImageFileName = "TopRight.png" },
        new s_TutorialImages { TutorialImageID = 3, PointerType = "PointRight", ImageFileName = "Right.png" },
        new s_TutorialImages { TutorialImageID = 4, PointerType = "PointBottomRight", ImageFileName = "DownRight.png" },
        new s_TutorialImages { TutorialImageID = 5, PointerType = "PointDown", ImageFileName = "Down.png" },
        new s_TutorialImages { TutorialImageID = 6, PointerType = "PointBottomLeft", ImageFileName = "BottomLeft.png" },
        new s_TutorialImages { TutorialImageID = 7, PointerType = "PointLeft", ImageFileName = "Left.png" },
        new s_TutorialImages { TutorialImageID = 8, PointerType = "PointTopLeft", ImageFileName = "TopLeft.png" }
    };
}

public class s_TutorialImages
{
    public int TutorialImageID { get; set; }
    public string PointerType { get; set; } = null!;
    public string? ImageFileName { get; set; }
}
