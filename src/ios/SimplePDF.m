#import "SimplePDF.h"

@interface SimplePDF()

@property (nonatomic, readonly) UIViewController *vc;
@property (nonatomic, readonly) NSURL *url;

@end

@implementation SimplePDF

- (void)showPDF:(CDVInvokedUrlCommand*)command
{
    
    CDVPluginResult* pluginResult = nil;
    
    NSString *path  = [command.arguments objectAtIndex:0];
    NSString *title = [command.arguments objectAtIndex:1];
    NSString *color = [command.arguments objectAtIndex:2];
    
    CGRect rect = [[UIScreen mainScreen] bounds];
    CGSize screenSize = rect.size;
    
    NSURL *url = [NSURL URLWithString:path];
    NSURLRequest *request = [NSURLRequest requestWithURL:url];
    _url = url;
    
    UIWebView *webView = [[UIWebView alloc] initWithFrame:CGRectMake(0,0,screenSize.width,screenSize.height)];
    webView.autoresizesSubviews = YES;
    webView.autoresizingMask = (UIViewAutoresizingFlexibleHeight | UIViewAutoresizingFlexibleWidth);
    webView.scrollView.scrollsToTop = YES;
    webView.scalesPageToFit = YES;
    
    [webView loadRequest:request];
    
    SimplePDFViewController *vc = [[SimplePDFViewController alloc] init];
    [vc.view addSubview:webView];
    _vc = vc;
    
    vc.title = title;
    
    vc.navigationItem.leftBarButtonItem = [[UIBarButtonItem alloc] initWithBarButtonSystemItem:UIBarButtonSystemItemStop
                                                                                        target:self action:@selector(done)];
    vc.navigationItem.rightBarButtonItem = [[UIBarButtonItem alloc] initWithBarButtonSystemItem:UIBarButtonSystemItemAction
                                                                                         target:self action:@selector(share)];
    
    UINavigationController *navController = [[UINavigationController alloc] initWithRootViewController:vc];
    [navController.navigationBar setTranslucent:NO];
    
    UIColor *primaryColor = [self colorWithHexString:color alpha:1.0f];
    
    [[UINavigationBar appearance] setTintColor:primaryColor];
    
    [[UINavigationBar appearance] setTitleTextAttributes: [NSDictionary dictionaryWithObjectsAndKeys:
                                                           primaryColor, NSForegroundColorAttributeName,
                                                           [UIFont systemFontOfSize:16.0f], NSFontAttributeName, nil]];
    
    [self.viewController presentViewController:navController animated:YES completion:nil];
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)done {
    
    [self.viewController dismissViewControllerAnimated:YES completion:nil];
    
}

- (void)share {
    
    NSData *data = [[NSData alloc] initWithContentsOfURL:self.url];
    NSURL *url = [NSURL fileURLWithPath:[NSTemporaryDirectory() stringByAppendingString:[self.url lastPathComponent]]];
    [data writeToURL:url atomically:NO];
    
    NSArray *activityItems = [NSArray arrayWithObjects:url, nil];
    
    UIActivityViewController *activityViewController = [[UIActivityViewController alloc] initWithActivityItems:activityItems applicationActivities:nil];
    activityViewController.modalTransitionStyle = UIModalTransitionStyleCoverVertical;
    
    [self.vc presentViewController:activityViewController animated:YES completion:nil];
    
}

- (UIColor *)colorWithHexString:(NSString *)strHex alpha:(CGFloat)alphaRange {
    
    int red = 0, green = 0, blue = 0;
    sscanf([strHex UTF8String], "#%02X%02X%02X", &red, &green, &blue);
    return  [UIColor colorWithRed:red/255.0 green:green/255.0 blue:blue/255.0 alpha:alphaRange];
    
}

@end;

@implementation SimplePDFViewController

- (void)viewDidLoad {
    
    [super viewDidLoad];
    
}

- (UIStatusBarStyle)preferredStatusBarStyle
{
    return UIStatusBarStyleLightContent;
}

@end
