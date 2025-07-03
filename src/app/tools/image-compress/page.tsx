/**
 * Image compressor tool
 * 图片压缩工具
 */

"use client";

import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ToolLayout } from "@/components/tool-layout";
import { tools } from "@/lib/tools-data";

const tool = tools.find(t => t.id === 'image-compress')!;

interface CompressedImage {
  file: File;
  url: string;
  size: number;
  originalSize: number;
  compressionRatio: number;
}

export default function ImageCompressPage() {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string>("");
  const [compressedImages, setCompressedImages] = useState<CompressedImage[]>([]);
  const [quality, setQuality] = useState([80]);
  const [maxWidth, setMaxWidth] = useState(1920);
  const [maxHeight, setMaxHeight] = useState(1080);
  const [isCompressing, setIsCompressing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection
  // 处理文件选择
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('请选择图片文件 / Please select an image file');
      return;
    }

    setOriginalImage(file);
    setOriginalUrl(URL.createObjectURL(file));
    setCompressedImages([]);
  };

  // Compress image
  // 压缩图片
  const compressImage = async () => {
    if (!originalImage) return;

    setIsCompressing(true);
    const results: CompressedImage[] = [];

    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const img = new Image();
      img.src = originalUrl;

      await new Promise((resolve) => {
        img.onload = () => {
          // Calculate new dimensions
          // 计算新尺寸
          let { width, height } = img;
          
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
          
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }

          canvas.width = width;
          canvas.height = height;

          // Draw image
          // 绘制图片
          ctx.drawImage(img, 0, 0, width, height);

          // Compress with different quality levels
          // 使用不同质量级别压缩
          const qualityLevels = [quality[0], Math.max(60, quality[0] - 20), Math.max(40, quality[0] - 40)];
          
          qualityLevels.forEach((q) => {
            canvas.toBlob((blob) => {
              if (blob) {
                const compressedFile = new File([blob], `compressed_${q}%.${originalImage.name.split('.').pop()}`, {
                  type: blob.type
                });
                
                const compressedUrl = URL.createObjectURL(blob);
                const compressionRatio = ((originalImage.size - blob.size) / originalImage.size) * 100;
                
                results.push({
                  file: compressedFile,
                  url: compressedUrl,
                  size: blob.size,
                  originalSize: originalImage.size,
                  compressionRatio
                });
              }
            }, 'image/jpeg', q / 100);
          });

          setTimeout(() => {
            setCompressedImages(results);
            setIsCompressing(false);
          }, 100);
        };
        img.onerror = resolve;
      });
    } catch (error) {
      console.error('压缩失败 / Compression failed:', error);
      setIsCompressing(false);
    }
  };

  // Download compressed image
  // 下载压缩后的图片
  const downloadImage = (compressedImage: CompressedImage) => {
    const link = document.createElement('a');
    link.href = compressedImage.url;
    link.download = compressedImage.file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Format file size
  // 格式化文件大小
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const clearAll = () => {
    setOriginalImage(null);
    setOriginalUrl("");
    setCompressedImages([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>选择图片 / Select Image</CardTitle>
            <CardDescription>
              选择要压缩的图片文件
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="image-input">图片文件 / Image File</Label>
                <Input
                  id="image-input"
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="mt-2"
                />
              </div>
              
              {originalImage && (
                <div className="space-y-2">
                  <Label>原始图片 / Original Image</Label>
                  <div className="flex items-center gap-4">
                    <img 
                      src={originalUrl} 
                      alt="Original" 
                      className="max-w-32 max-h-32 object-contain border rounded"
                    />
                    <div className="text-sm text-muted-foreground">
                      <div>文件名 / Filename: {originalImage.name}</div>
                      <div>大小 / Size: {formatFileSize(originalImage.size)}</div>
                      <div>类型 / Type: {originalImage.type}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {originalImage && (
          <Card>
            <CardHeader>
              <CardTitle>压缩设置 / Compression Settings</CardTitle>
              <CardDescription>
                调整压缩参数
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label>质量 / Quality: {quality[0]}%</Label>
                    <Slider
                      value={quality}
                      onValueChange={setQuality}
                      max={100}
                      min={10}
                      step={5}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="max-width">最大宽度 / Max Width: {maxWidth}px</Label>
                    <Input
                      id="max-width"
                      type="number"
                      value={maxWidth}
                      onChange={(e) => setMaxWidth(parseInt(e.target.value) || 1920)}
                      min="100"
                      max="4000"
                      className="mt-2"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="max-height">最大高度 / Max Height: {maxHeight}px</Label>
                    <Input
                      id="max-height"
                      type="number"
                      value={maxHeight}
                      onChange={(e) => setMaxHeight(parseInt(e.target.value) || 1080)}
                      min="100"
                      max="4000"
                      className="mt-2"
                    />
                  </div>
                  <div className="pt-6">
                    <Button 
                      onClick={compressImage} 
                      disabled={isCompressing}
                      className="w-full"
                    >
                      {isCompressing ? '压缩中... / Compressing...' : '开始压缩 / Start Compression'}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {compressedImages.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>压缩结果 / Compression Results</CardTitle>
              <CardDescription>
                压缩后的图片对比
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {compressedImages.map((compressed, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center gap-4">
                      <img 
                        src={compressed.url} 
                        alt={`Compressed ${index + 1}`}
                        className="max-w-32 max-h-32 object-contain border rounded"
                      />
                      <div className="flex-1 space-y-2">
                        <div className="text-sm">
                          <div>文件名 / Filename: {compressed.file.name}</div>
                          <div>大小 / Size: {formatFileSize(compressed.size)}</div>
                          <div>压缩率 / Compression: {compressed.compressionRatio.toFixed(1)}%</div>
                          <div>节省空间 / Saved: {formatFileSize(compressed.originalSize - compressed.size)}</div>
                        </div>
                        <Button 
                          onClick={() => downloadImage(compressed)}
                          size="sm"
                        >
                          下载 / Download
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="flex gap-3">
                  <Button onClick={clearAll} variant="outline">
                    清空所有 / Clear All
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>使用说明 / Instructions</CardTitle>
            <CardDescription>
              图片压缩工具使用指南
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm">
              <div>
                <div className="font-medium mb-2">支持的格式 / Supported Formats</div>
                <div className="text-muted-foreground">
                  JPEG, PNG, WebP, GIF, BMP 等常见图片格式
                </div>
              </div>
              <div>
                <div className="font-medium mb-2">压缩原理 / Compression Principle</div>
                <div className="text-muted-foreground">
                  通过调整图片质量、尺寸来减小文件大小，保持图片清晰度
                </div>
              </div>
              <div>
                <div className="font-medium mb-2">建议设置 / Recommended Settings</div>
                <div className="text-muted-foreground">
                  <div>• 网页使用: 质量 70-80%, 最大宽度 1200px</div>
                  <div>• 移动端: 质量 60-70%, 最大宽度 800px</div>
                  <div>• 缩略图: 质量 50-60%, 最大宽度 400px</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
} 